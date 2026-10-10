import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../utils/prisma';
import { authenticateJwt } from '../../middleware/auth';

const router = Router();

// POST /api/v1/auth/login
router.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { identifier, password } = req.body; // mobile or email

    if (!identifier || !password) {
      res.status(400).json({ success: false, message: 'Please provide mobile/email and password' });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ mobile: identifier }, { email: identifier }],
        isActive: true,
      },
      include: {
        school: true,
      },
    });

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid credentials or inactive account' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const accessSecret = process.env.JWT_ACCESS_SECRET || 'mdca_super_secret_access_token_key_change_in_prod';
    const refreshSecret = process.env.JWT_REFRESH_SECRET || 'mdca_super_secret_refresh_token_key_change_in_prod';

    const tokenPayload = {
      userId: user.id,
      schoolId: user.schoolId,
      role: user.role,
      mobile: user.mobile,
    };

    const accessToken = jwt.sign(tokenPayload, accessSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign(tokenPayload, refreshSecret, { expiresIn: '30d' });

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: `${user.firstName} ${user.lastName || ''}`.trim(),
          role: user.role,
          mobile: user.mobile,
          email: user.email,
          school: {
            id: user.school.id,
            name: user.school.name,
            code: user.school.code,
          },
        },
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: 900,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/auth/me
router.get('/me', authenticateJwt, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      include: {
        school: true,
        student: {
          include: {
            enrollments: {
              include: {
                section: {
                  include: { class: true },
                },
              },
            },
          },
        },
        staff: true,
      },
    });

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        name: `${user.firstName} ${user.lastName || ''}`.trim(),
        role: user.role,
        mobile: user.mobile,
        email: user.email,
        school: user.school,
        studentDetails: user.student,
        staffDetails: user.staff,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
