import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../utils/prisma';
import { authenticateJwt, requireRoles } from '../../middleware/auth';
export type PaymentMode = 'UPI' | 'NET_BANKING' | 'CARD' | 'CASH' | 'CHEQUE' | 'DEMAND_DRAFT';

const router = Router();

// GET /api/v1/fees/student/:studentId - Get student fee ledger dues
router.get(
  '/student/:studentId',
  authenticateJwt,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { studentId } = req.params;

      const ledgers = await prisma.studentFeeLedger.findMany({
        where: { studentId },
        include: { feeHead: true },
        orderBy: { dueDate: 'asc' },
      });

      const payments = await prisma.payment.findMany({
        where: { studentId },
        include: { items: { include: { ledger: { include: { feeHead: true } } } } },
        orderBy: { paidAt: 'desc' },
      });

      // Calculate totals in paise
      let totalDuePaise = BigInt(0);
      let totalPaidPaise = BigInt(0);

      ledgers.forEach((l) => {
        totalDuePaise += (l.amountDuePaise - l.concessionPaise);
        totalPaidPaise += l.amountPaidPaise;
      });

      const pendingBalancePaise = totalDuePaise - totalPaidPaise;

      res.json({
        success: true,
        data: {
          summary: {
            totalDuePaise: totalDuePaise.toString(),
            totalPaidPaise: totalPaidPaise.toString(),
            pendingBalancePaise: pendingBalancePaise.toString(),
            totalDueRupees: Number(totalDuePaise) / 100,
            totalPaidRupees: Number(totalPaidPaise) / 100,
            pendingBalanceRupees: Number(pendingBalancePaise) / 100,
          },
          ledgers: ledgers.map((l) => ({
            ...l,
            amountDuePaise: l.amountDuePaise.toString(),
            concessionPaise: l.concessionPaise.toString(),
            amountPaidPaise: l.amountPaidPaise.toString(),
            netPayableRupees: Number(l.amountDuePaise - l.concessionPaise - l.amountPaidPaise) / 100,
          })),
          payments: payments.map((p) => ({
            ...p,
            totalAmount: p.totalAmount.toString(),
            totalAmountRupees: Number(p.totalAmount) / 100,
          })),
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/v1/fees/collect - Counter fee collection with transaction & sequential receipt numbering
router.post(
  '/collect',
  authenticateJwt,
  requireRoles('ACCOUNTANT', 'ADMIN', 'SUPER_ADMIN'),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { studentId, mode, allocations, gatewayTxnId } = req.body;
      // allocations: Array<{ ledgerId: string; amountPaise: number }>

      if (!studentId || !mode || !Array.isArray(allocations) || allocations.length === 0) {
        res.status(400).json({ success: false, message: 'Invalid payload: studentId, mode, and allocations required' });
        return;
      }

      const totalAmountPaise = allocations.reduce((sum, a) => sum + BigInt(a.amountPaise), BigInt(0));

      const payment = await prisma.$transaction(async (tx) => {
        // Generate unique sequential receipt number
        const count = await tx.payment.count();
        const year = new Date().getFullYear();
        const receiptNo = `MDCA-${year}-${String(count + 1).padStart(5, '0')}`;

        // Create Payment record
        const p = await tx.payment.create({
          data: {
            studentId,
            receiptNo,
            totalAmount: totalAmountPaise,
            mode: (mode as PaymentMode) || 'CASH',
            gatewayTxnId: gatewayTxnId || null,
            collectedById: req.user!.userId,
            status: 'SUCCESS',
          },
        });

        // Create Payment Items and update Ledgers
        for (const item of allocations) {
          const itemAmountPaise = BigInt(item.amountPaise);
          await tx.paymentItem.create({
            data: {
              paymentId: p.id,
              ledgerId: item.ledgerId,
              amountPaise: itemAmountPaise,
            },
          });

          // Update ledger amount_paid and status
          const ledger = await tx.studentFeeLedger.findUniqueOrThrow({
            where: { id: item.ledgerId },
          });

          const newAmountPaid = ledger.amountPaidPaise + itemAmountPaise;
          const netPayable = ledger.amountDuePaise - ledger.concessionPaise;

          const newStatus =
            newAmountPaid >= netPayable
              ? 'PAID'
              : newAmountPaid > BigInt(0)
              ? 'PARTIAL'
              : 'PENDING';

          await tx.studentFeeLedger.update({
            where: { id: item.ledgerId },
            data: {
              amountPaidPaise: newAmountPaid,
              status: newStatus,
            },
          });
        }

        // Create audit log
        await tx.auditLog.create({
          data: {
            userId: req.user!.userId,
            action: 'FEE_PAYMENT_COLLECTED',
            entity: 'Payment',
            entityId: p.id,
            newValue: JSON.stringify({ receiptNo, totalAmountPaise: totalAmountPaise.toString(), mode }),
          },
        });

        return p;
      });

      res.status(201).json({
        success: true,
        message: 'Fee collected and receipt generated successfully',
        data: {
          paymentId: payment.id,
          receiptNo: payment.receiptNo,
          totalAmountPaise: payment.totalAmount.toString(),
          totalAmountRupees: Number(payment.totalAmount) / 100,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
