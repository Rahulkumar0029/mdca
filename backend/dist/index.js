"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const students_routes_1 = __importDefault(require("./modules/students/students.routes"));
const attendance_routes_1 = __importDefault(require("./modules/attendance/attendance.routes"));
const fees_routes_1 = __importDefault(require("./modules/fees/fees.routes"));
const reports_routes_1 = __importDefault(require("./modules/reports/reports.routes"));
const notices_routes_1 = __importDefault(require("./modules/notices/notices.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Security & utility middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: '*', credentials: true }));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health Check API
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        system: 'MDCA School ERP API (M.D. Children Academy)',
        environment: process.env.NODE_ENV || 'development',
        time: new Date().toISOString(),
    });
});
// Versioned API Routes (/api/v1)
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/students', students_routes_1.default);
app.use('/api/v1/attendance', attendance_routes_1.default);
app.use('/api/v1/fees', fees_routes_1.default);
app.use('/api/v1/reports', reports_routes_1.default);
app.use('/api/v1/notices', notices_routes_1.default);
// Global Error Handler
app.use(errorHandler_1.errorHandler);
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 MDCA School ERP API running on http://localhost:${PORT}`);
        console.log(`📚 Health check endpoint: http://localhost:${PORT}/health`);
    });
}
exports.default = app;
