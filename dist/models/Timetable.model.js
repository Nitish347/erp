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
exports.TimetableModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const TimetableSchema = new mongoose_1.Schema({
    teacherId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student'
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    dayOfWeek: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: {
        type: String,
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // HH:MM format validation
    },
    endTime: {
        type: String,
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // HH:MM format validation
    },
    room: {
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
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });
// Index for efficient queries
TimetableSchema.index({ teacherId: 1, dayOfWeek: 1 });
TimetableSchema.index({ studentId: 1, dayOfWeek: 1 });
TimetableSchema.index({ dayOfWeek: 1, startTime: 1 });
exports.TimetableModel = mongoose_1.default.models.Timetable || mongoose_1.default.model('Timetable', TimetableSchema);
//# sourceMappingURL=Timetable.model.js.map