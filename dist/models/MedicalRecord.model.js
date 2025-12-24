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
exports.MedicalRecordModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const HealthParameterSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
    status: { type: String, enum: ['normal', 'abnormal', 'critical'], default: 'normal' },
}, { _id: false });
const MedicalRecordSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Student', required: true },
    checkupDate: { type: Date, required: true },
    checkupType: { type: String, required: true },
    parameters: [HealthParameterSchema],
    drName: { type: String, required: true },
    remark: { type: String },
    attachment: [{ type: String }],
    instituteId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Institute', required: true },
}, { timestamps: true });
// Indexes
MedicalRecordSchema.index({ userId: 1, checkupDate: -1 });
MedicalRecordSchema.index({ instituteId: 1 });
exports.MedicalRecordModel = mongoose_1.default.models.MedicalRecord || mongoose_1.default.model('MedicalRecord', MedicalRecordSchema);
//# sourceMappingURL=MedicalRecord.model.js.map