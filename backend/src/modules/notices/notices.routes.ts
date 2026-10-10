import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../utils/prisma';
import { authenticateJwt, requireRoles } from '../../middleware/auth';

const router = Router();

// GET /api/v1/notices - Fetch notice board
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 20,
    });

    res.json({
      success: true,
      data: notices,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/notices - Post new notice (Admin / Principal)
router.post(
  '/',
  authenticateJwt,
  requireRoles('ADMIN', 'PRINCIPAL', 'SUPER_ADMIN'),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, body, category, audienceType, attachments } = req.body;
      const schoolId = req.user!.schoolId;

      if (!title || !body) {
        res.status(400).json({ success: false, message: 'Title and body are required' });
        return;
      }

      const notice = await prisma.notice.create({
        data: {
          schoolId,
          title,
          body,
          category: category || 'GENERAL',
          audienceType: audienceType || 'ALL',
          attachments,
        },
      });

      res.status(201).json({
        success: true,
        message: 'Notice broadcasted successfully',
        data: notice,
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/v1/enquiries - Public website admission enquiry submission
router.post('/enquiries', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { childName, parentName, mobile, email, classSought, notes } = req.body;

    if (!childName || !parentName || !mobile || !classSought) {
      res.status(400).json({ success: false, message: 'Child name, parent name, mobile, and class sought are required' });
      return;
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        childName,
        parentName,
        mobile,
        email,
        classSought,
        notes,
        status: 'NEW',
        source: 'WEBSITE',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Admission enquiry submitted successfully. The school office will contact you shortly.',
      enquiryId: enquiry.id,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
