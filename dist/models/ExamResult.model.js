"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamResultModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ExamResultSchema = new mongoose_1.Schema({
    studentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Student', required: true },
    examId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Exam', required: true },
    subject: { type: String, required: true },
    marks: { type: Number, required: true, default: 0 },
    totalMarks: { type: Number, required: true },
    grade: { type: String },
    remarks: { type: String },
    status: { type: String, enum: ['pending', 'submitted', 'graded'], default: 'pending' },
    isPresent: { type: Boolean, default: true },
    teacherRemarks: { type: String },
}, { timestamps: true });
// Indexes
ExamResultSchema.index({ studentId: 1, examId: 1 }, { unique: true });
ExamResultSchema.index({ examId: 1, status: 1 });
ExamResultSchema.index({ studentId: 1 });
exports.ExamResultModel = mongoose_1.default.models.ExamResult || mongoose_1.default.model('ExamResult', ExamResultSchema);
//# sourceMappingURL=ExamResult.model.js.map