"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeacherHandler = createTeacherHandler;
exports.listTeachersHandler = listTeachersHandler;
exports.getTeacherByIdHandler = getTeacherByIdHandler;
exports.updateTeacherHandler = updateTeacherHandler;
exports.deleteTeacherHandler = deleteTeacherHandler;
exports.listStudentsByTeacherHandler = listStudentsByTeacherHandler;
exports.getStudentByTeacherHandler = getStudentByTeacherHandler;
const teacher_service_1 = require("../services/teacher.service");
async function createTeacherHandler(req, res) {
    try {
        // Only admins and institutes can create teachers
        if (!req.user || req.user.role !== 'admin') {
            res.status(403).json({ success: false, message: 'Only admins can create teachers' });
            return;
        }
        // If admin, automatically set the institute field
        if (req.user.role === 'admin') {
            req.body.institute = req.user.id;
        }
        const teacher = await (0, teacher_service_1.createTeacher)(req.body);
        const teacherData = teacher.toObject();
        // delete teacherData.password;
        res.status(201).json({ success: true, data: teacherData });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function listTeachersHandler(req, res) {
    try {
        // If admin, only show their teachers
        if (req.user?.role === 'admin') {
            const teachers = await (0, teacher_service_1.listTeachers)({ institute: req.user.id });
            res.json({ success: true, data: teachers });
            return;
        }
        // Admin and others can see all
        const teachers = await (0, teacher_service_1.listTeachers)();
        res.json({ success: true, data: teachers });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getTeacherByIdHandler(req, res) {
    try {
        const teacher = await (0, teacher_service_1.getTeacherById)(req.params.id);
        if (!teacher) {
            res.status(404).json({ success: false, message: 'Teacher not found' });
            return;
        }
        // If admin, verify ownership
        if (req.user?.role === 'admin' && teacher.institute?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only view your own teachers' });
            return;
        }
        res.json({ success: true, data: teacher });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function updateTeacherHandler(req, res) {
    try {
        // Only admins and institutes can update teachers
        if (!req.user || req.user.role !== 'admin') {
            res.status(403).json({ success: false, message: 'Only admins can update teachers' });
            return;
        }
        // If admin, verify ownership
        if (req.user.role === 'admin') {
            const teacher = await (0, teacher_service_1.getTeacherById)(req.params.id);
            if (!teacher || teacher.institute?.toString() !== req.user.id) {
                res.status(403).json({ success: false, message: 'You can only update your own teachers' });
                return;
            }
        }
        const updated = await (0, teacher_service_1.updateTeacher)(req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ success: false, message: 'Teacher not found' });
            return;
        }
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteTeacherHandler(req, res) {
    try {
        // Only admins and institutes can delete teachers
        if (!req.user || req.user.role !== 'admin') {
            res.status(403).json({ success: false, message: 'Only admins can delete teachers' });
            return;
        }
        // If admin, verify ownership
        if (req.user.role === 'admin') {
            const teacher = await (0, teacher_service_1.getTeacherById)(req.params.id);
            if (!teacher || teacher.institute?.toString() !== req.user.id) {
                res.status(403).json({ success: false, message: 'You can only delete your own teachers' });
                return;
            }
        }
        const deleted = await (0, teacher_service_1.deleteTeacher)(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Teacher not found' });
            return;
        }
        res.json({ success: true, message: 'Teacher deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function listStudentsByTeacherHandler(req, res) {
    try {
        if (!req.user || req.user.role !== 'teacher') {
            res.status(403).json({ success: false, message: 'Only teachers can view their students' });
            return;
        }
        const students = await (0, teacher_service_1.listStudentsByTeacher)(req.user.id);
        res.json({ success: true, data: students });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getStudentByTeacherHandler(req, res) {
    try {
        if (!req.user || req.user.role !== 'teacher') {
            res.status(403).json({ success: false, message: 'Only teachers can view their students' });
            return;
        }
        const student = await (0, teacher_service_1.getStudentByTeacher)(req.user.id, req.params.id);
        if (!student) {
            res.status(404).json({ success: false, message: 'Student not found' });
            return;
        }
        res.json({ success: true, data: student });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=teacher.controller.js.map