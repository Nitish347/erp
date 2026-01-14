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
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const examTypeController = __importStar(require("../../controllers/examType.controller"));
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
// Create exam type - Admins only
router.post('/', (0, auth_1.requireRole)(['admin', 'super_admin']), examTypeController.createExamTypeHandler);
// List exam types - All roles
router.get('/', examTypeController.listExamTypesHandler);
// Get exam type by ID - All roles
router.get('/:id', examTypeController.getExamTypeByIdHandler);
// Update exam type - Admins only
router.put('/:id', (0, auth_1.requireRole)(['admin', 'super_admin']), examTypeController.updateExamTypeHandler);
// Delete exam type - Admins only
router.delete('/:id', (0, auth_1.requireRole)(['admin', 'super_admin']), examTypeController.deleteExamTypeHandler);
exports.default = router;
//# sourceMappingURL=examType.routes.js.map