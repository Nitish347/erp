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
exports.ExamModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ExamSchema = new mongoose_1.Schema({
    examTypeId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ExamType', required: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ['quiz', 'mid-term', 'final', 'assignment'], required: true },
    subject: { type: String, required: true },
    classId: { type: String, required: true },
    section: { type: String, required: true },
    teacherId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    totalMarks: { type: Number, required: true },
    durationMinutes: { type: Number },
    examDate: { type: Date, required: true },
    instructions: { type: String },
    syllabus: { type: String },
    instituteId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Institute', required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
// Indexes
ExamSchema.index({ classId: 1, examDate: -1 });
ExamSchema.index({ teacherId: 1, examDate: -1 });
ExamSchema.index({ instituteId: 1, examDate: -1 });
exports.ExamModel = mongoose_1.default.models.Exam || mongoose_1.default.model('Exam', ExamSchema);
//# sourceMappingURL=Exam.model.js.map