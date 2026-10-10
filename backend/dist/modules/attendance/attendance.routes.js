"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../../utils/prisma");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
// POST /api/v1/attendance/mark - Bulk attendance marking for a class section
router.post('/mark', auth_1.authenticateJwt, (0, auth_1.requireRoles)('TEACHER', 'ADMIN', 'PRINCIPAL', 'SUPER_ADMIN'), async (req, res, next) => {
    try {
        const { sectionId, date, records } = req.body;
        // records: Array<{ studentId: string; status: AttendanceStatus; remark?: string }>
        if (!sectionId || !date || !Array.isArray(records)) {
            res.status(400).json({ success: false, message: 'Invalid payload. sectionId, date, and records required' });
            return;
        }
        const attendanceDate = new Date(date);
        // Create or update session
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            let session = await tx.attendanceSession.findFirst({
                where: {
                    sectionId,
                    date: attendanceDate,
                    periodNo: null,
                },
            });
            if (!session) {
                session = await tx.attendanceSession.create({
                    data: {
                        sectionId,
                        date: attendanceDate,
                        takenById: req.user.userId,
                    },
                });
            }
            // Upsert each student record
            for (const item of records) {
                await tx.attendanceRecord.upsert({
                    where: {
                        sessionId_studentId: {
                            sessionId: session.id,
                            studentId: item.studentId,
                        },
                    },
                    create: {
                        sessionId: session.id,
                        studentId: item.studentId,
                        status: item.status || 'PRESENT',
                        remark: item.remark,
                    },
                    update: {
                        status: item.status || 'PRESENT',
                        remark: item.remark,
                    },
                });
            }
            return session;
        });
        res.json({
            success: true,
            message: 'Attendance saved successfully',
            sessionId: result.id,
        });
    }
    catch (error) {
        next(error);
    }
});
// GET /api/v1/attendance/section/:sectionId?date=YYYY-MM-DD
router.get('/section/:sectionId', auth_1.authenticateJwt, async (req, res, next) => {
    try {
        const { sectionId } = req.params;
        const dateStr = req.query.date || new Date().toISOString().split('T')[0];
        const targetDate = new Date(dateStr);
        const session = await prisma_1.prisma.attendanceSession.findFirst({
            where: {
                sectionId,
                date: targetDate,
            },
            include: {
                records: {
                    include: {
                        student: {
                            select: {
                                id: true,
                                admissionNo: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });
        res.json({
            success: true,
            data: session,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
