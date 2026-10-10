"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../../utils/prisma");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
// GET /api/v1/notices - Fetch notice board
router.get('/', async (req, res, next) => {
    try {
        const notices = await prisma_1.prisma.notice.findMany({
            orderBy: { publishedAt: 'desc' },
            take: 20,
        });
        res.json({
            success: true,
            data: notices,
        });
    }
    catch (error) {
        next(error);
    }
});
// POST /api/v1/notices - Post new notice (Admin / Principal)
router.post('/', auth_1.authenticateJwt, (0, auth_1.requireRoles)('ADMIN', 'PRINCIPAL', 'SUPER_ADMIN'), async (req, res, next) => {
    try {
        const { title, body, category, audienceType, attachments } = req.body;
        const schoolId = req.user.schoolId;
        if (!title || !body) {
            res.status(400).json({ success: false, message: 'Title and body are required' });
            return;
        }
        const notice = await prisma_1.prisma.notice.create({
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
    }
    catch (error) {
        next(error);
    }
});
// POST /api/v1/enquiries - Public website admission enquiry submission
router.post('/enquiries', async (req, res, next) => {
    try {
        const { childName, parentName, mobile, email, classSought, notes } = req.body;
        if (!childName || !parentName || !mobile || !classSought) {
            res.status(400).json({ success: false, message: 'Child name, parent name, mobile, and class sought are required' });
            return;
        }
        const enquiry = await prisma_1.prisma.enquiry.create({
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
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
