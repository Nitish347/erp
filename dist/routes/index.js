"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const express_1 = require("express");
const health_routes_1 = __importDefault(require("./modules/health.routes"));
const teacher_routes_1 = __importDefault(require("./modules/teacher.routes"));
const student_routes_1 = __importDefault(require("./modules/student.routes"));
const timetable_routes_1 = __importDefault(require("./modules/timetable.routes"));
const attendance_routes_1 = __importDefault(require("./modules/attendance.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth.routes"));
const admin_routes_1 = __importDefault(require("./modules/admin.routes"));
const homework_routes_1 = __importDefault(require("./modules/homework.routes"));
const homeworkSubmission_routes_1 = __importDefault(require("./modules/homeworkSubmission.routes"));
const exam_routes_1 = __importDefault(require("./modules/exam.routes"));
const examType_routes_1 = __importDefault(require("./modules/examType.routes"));
const examResult_routes_1 = __importDefault(require("./modules/examResult.routes"));
const notice_routes_1 = __importDefault(require("./modules/notice.routes"));
const medicalRecord_routes_1 = __importDefault(require("./modules/medicalRecord.routes"));
const class_routes_1 = __importDefault(require("./modules/class.routes"));
const subject_routes_1 = __importDefault(require("./modules/subject.routes"));
const fee_routes_1 = __importDefault(require("./modules/fee.routes"));
const super_admin_routes_1 = __importDefault(require("./modules/super-admin.routes"));
function registerRoutes(app) {
    const apiRoot = '/api/v1';
    const router = (0, express_1.Router)();
    router.use('/health', health_routes_1.default);
    router.use('/auth', auth_routes_1.default);
    router.use('/super-admin', super_admin_routes_1.default);
    router.use('/admin', admin_routes_1.default);
    router.use('/teachers', teacher_routes_1.default);
    router.use('/students', student_routes_1.default);
    router.use('/timetables', timetable_routes_1.default);
    router.use('/attendance', attendance_routes_1.default);
    router.use('/homework', homework_routes_1.default);
    router.use('/homework-submissions', homeworkSubmission_routes_1.default);
    router.use('/exams', exam_routes_1.default);
    router.use('/exam-types', examType_routes_1.default);
    router.use('/exam-results', examResult_routes_1.default);
    router.use('/notices', notice_routes_1.default);
    router.use('/medical-records', medicalRecord_routes_1.default);
    router.use('/classes', class_routes_1.default);
    router.use('/subjects', subject_routes_1.default);
    router.use('/fees', fee_routes_1.default);
    app.use(apiRoot, router);
}
//# sourceMappingURL=index.js.map