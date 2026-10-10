import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../utils/prisma';
import { authenticateJwt, requireRoles } from '../../middleware/auth';

const router = Router();

// GET /api/v1/reports/dashboard/principal - Comprehensive principal/admin overview
router.get(
  '/dashboard/principal',
  authenticateJwt,
  requireRoles('PRINCIPAL', 'ADMIN', 'SUPER_ADMIN'),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const schoolId = req.user!.schoolId;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      // Run parallel aggregation
      const [
        totalStudents,
        totalStaff,
        todayPayments,
        monthPayments,
        pendingLedgers,
        todayAttendanceRecords,
      ] = await Promise.all([
        prisma.student.count({ where: { schoolId, status: 'ACTIVE', deletedAt: null } }),
        prisma.staff.count({ where: { schoolId } }),
        prisma.payment.findMany({
          where: {
            student: { schoolId },
            status: 'SUCCESS',
            paidAt: { gte: today },
          },
          select: { totalAmount: true },
        }),
        prisma.payment.findMany({
          where: {
            student: { schoolId },
            status: 'SUCCESS',
            paidAt: { gte: firstDayOfMonth },
          },
          select: { totalAmount: true },
        }),
        prisma.studentFeeLedger.findMany({
          where: {
            student: { schoolId },
            status: { in: ['PENDING', 'PARTIAL'] },
          },
          select: { amountDuePaise: true, concessionPaise: true, amountPaidPaise: true },
        }),
        prisma.attendanceRecord.findMany({
          where: {
            session: {
              section: { class: { schoolId } },
              date: today,
            },
          },
          select: { status: true },
        }),
      ]);

      // Calculate fee stats
      const todayCollectedPaise = todayPayments.reduce((sum, p) => sum + p.totalAmount, BigInt(0));
      const monthCollectedPaise = monthPayments.reduce((sum, p) => sum + p.totalAmount, BigInt(0));
      const totalPendingDuesPaise = pendingLedgers.reduce(
        (sum, l) => sum + (l.amountDuePaise - l.concessionPaise - l.amountPaidPaise),
        BigInt(0)
      );

      // Calculate attendance stats
      const presentCount = todayAttendanceRecords.filter((r) => r.status === 'PRESENT').length;
      const totalAttendanceMarked = todayAttendanceRecords.length;
      const attendancePercent =
        totalAttendanceMarked > 0
          ? Math.round((presentCount / totalAttendanceMarked) * 100)
          : 0;

      res.json({
        success: true,
        data: {
          students: {
            totalActive: totalStudents,
          },
          staff: {
            total: totalStaff,
          },
          attendanceToday: {
            totalMarked: totalAttendanceMarked,
            present: presentCount,
            absent: totalAttendanceMarked - presentCount,
            percentage: attendancePercent,
          },
          fees: {
            todayCollectedRupees: Number(todayCollectedPaise) / 100,
            monthCollectedRupees: Number(monthCollectedPaise) / 100,
            pendingDuesRupees: Number(totalPendingDuesPaise) / 100,
            defaulterCount: pendingLedgers.length,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
