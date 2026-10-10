"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../../utils/prisma");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
// GET /api/v1/students - List students with server-side pagination & filter
router.get('/', auth_1.authenticateJwt, async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, parseInt(req.query.limit) || 20);
        const skip = (page - 1) * limit;
        const search = (req.query.search || '').trim();
        const classId = req.query.classId;
        const schoolId = req.user.schoolId;
        const whereClause = {
            schoolId,
            deletedAt: null,
            ...(search && {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { admissionNo: { contains: search, mode: 'insensitive' } },
                    { srNo: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(classId && {
                enrollments: {
                    some: {
                        section: {
                            classId,
                        },
                    },
                },
            }),
        };
        const [total, students] = await Promise.all([
            prisma_1.prisma.student.count({ where: whereClause }),
            prisma_1.prisma.student.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { admissionNo: 'asc' },
                include: {
                    enrollments: {
                        take: 1,
                        include: {
                            section: {
                                include: { class: true },
                            },
                        },
                    },
                    guardians: {
                        include: { guardian: true },
                    },
                },
            }),
        ]);
        res.json({
            success: true,
            data: students,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        next(error);
    }
});
// GET /api/v1/students/:id/360 - Student 360-degree comprehensive profile
router.get('/:id/360', auth_1.authenticateJwt, async (req, res, next) => {
    try {
        const { id } = req.params;
        const schoolId = req.user.schoolId;
        const student = await prisma_1.prisma.student.findFirst({
            where: { id, schoolId, deletedAt: null },
            include: {
                enrollments: {
                    include: {
                        academicYear: true,
                        section: { include: { class: true } },
                    },
                },
                guardians: {
                    include: { guardian: true },
                },
                feeLedgers: {
                    include: { feeHead: true },
                    orderBy: { dueDate: 'asc' },
                },
                marks: {
                    include: {
                        examSubject: {
                            include: {
                                exam: true,
                                subject: true,
                            },
                        },
                    },
                },
                attendance: {
                    take: 30,
                    orderBy: { session: { date: 'desc' } },
                    include: { session: true },
                },
            },
        });
        if (!student) {
            res.status(404).json({ success: false, message: 'Student profile not found' });
            return;
        }
        res.json({
            success: true,
            data: student,
        });
    }
    catch (error) {
        next(error);
    }
});
// POST /api/v1/students - Create new student
router.post('/', auth_1.authenticateJwt, (0, auth_1.requireRoles)('ADMIN', 'PRINCIPAL', 'SUPER_ADMIN'), async (req, res, next) => {
    try {
        const schoolId = req.user.schoolId;
        const { admissionNo, srNo, firstName, lastName, dob, gender, bloodGroup, category, address, guardianName, guardianMobile, guardianRelation, sectionId, academicYearId, } = req.body;
        if (!admissionNo || !firstName || !dob || !gender || !sectionId || !academicYearId) {
            res.status(400).json({ success: false, message: 'Required fields missing' });
            return;
        }
        // Run in transaction
        const newStudent = await prisma_1.prisma.$transaction(async (tx) => {
            const student = await tx.student.create({
                data: {
                    schoolId,
                    admissionNo,
                    srNo,
                    firstName,
                    lastName,
                    dob: new Date(dob),
                    gender,
                    bloodGroup,
                    category,
                    address,
                },
            });
            // Create enrollment
            await tx.studentEnrollment.create({
                data: {
                    studentId: student.id,
                    sectionId,
                    academicYearId,
                },
            });
            // Create guardian if provided
            if (guardianName && guardianMobile) {
                const guardian = await tx.guardian.create({
                    data: {
                        schoolId,
                        name: guardianName,
                        mobile: guardianMobile,
                        relation: guardianRelation || 'Parent',
                    },
                });
                await tx.studentGuardian.create({
                    data: {
                        studentId: student.id,
                        guardianId: guardian.id,
                        isPrimary: true,
                    },
                });
            }
            return student;
        });
        res.status(201).json({
            success: true,
            message: 'Student admitted successfully',
            data: newStudent,
        });
    }
    catch (error) {
        if (error.code === 'P2002') {
            res.status(400).json({ success: false, message: 'Admission number already exists in this school' });
            return;
        }
        next(error);
    }
});
exports.default = router;
