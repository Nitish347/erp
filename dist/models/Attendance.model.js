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
exports.AttendanceModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const AttendanceSchema = new mongoose_1.Schema({
    teacherId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['Present', 'Absent', 'Late', 'Excused']
    },
    subject: {
        type: String,
        trim: true
    },
    class: {
        type: String,
        trim: true
    },
    section: {
        type: String,
        trim: true
    },
    remarks: {
        type: String,
        trim: true
    },
    markedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    markedAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });
// Index for efficient queries
AttendanceSchema.index({ teacherId: 1, date: 1 });
AttendanceSchema.index({ studentId: 1, date: 1 });
AttendanceSchema.index({ date: 1, status: 1 });
AttendanceSchema.index({ teacherId: 1, studentId: 1, date: 1 }, { unique: true }); // Prevent duplicate entries
exports.AttendanceModel = mongoose_1.default.models.Attendance || mongoose_1.default.model('Attendance', AttendanceSchema);
//# sourceMappingURL=Attendance.model.js.map