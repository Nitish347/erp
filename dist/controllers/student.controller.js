"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentHandler = createStudentHandler;
exports.listStudentsHandler = listStudentsHandler;
exports.getStudentByIdHandler = getStudentByIdHandler;
exports.updateStudentHandler = updateStudentHandler;
exports.deleteStudentHandler = deleteStudentHandler;
const student_service_1 = require("../services/student.service");
async function createStudentHandler(req, res) {
    try {
        // Only admins and institutes can create students
        if (!req.user || req.user.role !== 'admin') {
            res.status(403).json({ success: false, message: 'Only admins and institutes can create students' });
            return;
        }
        // If admin, automatically set the institute field
        if (req.user.role === 'admin') {
            req.body.institute = req.user.id;
        }
        const student = await (0, student_service_1.createStudent)(req.body);
        const studentData = student.toObject();
        delete studentData.password;
        res.status(201).json({ success: true, data: studentData });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function listStudentsHandler(req, res) {
    try {
        // If admin, only show their students
        if (req.user?.role === 'admin') {
            const students = await (0, student_service_1.listStudents)({ institute: req.user.id });
            res.json({ success: true, data: students });
            return;
        }
        // If teacher, only show their students
        if (req.user?.role === 'teacher') {
            const students = await (0, student_service_1.listStudents)({ teacher: req.user.id });
            res.json({ success: true, data: students });
            return;
        }
        // Admin and others can see all
        const students = await (0, student_service_1.listStudents)();
        res.json({ success: true, data: students });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getStudentByIdHandler(req, res) {
    try {
        const student = await (0, student_service_1.getStudentById)(req.params.id);
        if (!student) {
            res.status(404).json({ success: false, message: 'Student not found' });
            return;
        }
        // If admin, verify ownership
        if (req.user?.role === 'admin' && student.institute?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only view your own students' });
            return;
        }
        // If teacher, verify ownership
        if (req.user?.role === 'teacher' && student.teacher?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only view your own students' });
            return;
        }
        res.json({ success: true, data: student });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function updateStudentHandler(req, res) {
    try {
        // Only admins and institutes can update students
        if (!req.user || req.user.role !== 'admin') {
            res.status(403).json({ success: false, message: 'Only admins can update students' });
            return;
        }
        // If admin, verify ownership
        if (req.user.role === 'admin') {
            const student = await (0, student_service_1.getStudentById)(req.params.id);
            if (!student || student.institute?.toString() !== req.user.id) {
                res.status(403).json({ success: false, message: 'You can only update your own students' });
                return;
            }
        }
        const updated = await (0, student_service_1.updateStudent)(req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ success: false, message: 'Student not found' });
            return;
        }
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteStudentHandler(req, res) {
    try {
        // Only admins and institutes can delete students
        if (!req.user || req.user.role !== 'admin') {
            res.status(403).json({ success: false, message: 'Only admins can delete students' });
            return;
        }
        // If admin, verify ownership
        if (req.user.role === 'admin') {
            const student = await (0, student_service_1.getStudentById)(req.params.id);
            if (!student || student.institute?.toString() !== req.user.id) {
                res.status(403).json({ success: false, message: 'You can only delete your own students' });
                return;
            }
        }
        const deleted = await (0, student_service_1.deleteStudent)(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Student not found' });
            return;
        }
        res.json({ success: true, message: 'Student deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=student.controller.js.map