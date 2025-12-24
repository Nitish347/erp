"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
// Centralized error handler
function errorHandler(error, _req, res, _next) {
    const status = 500;
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    res.status(status).json({ success: false, message });
}
//# sourceMappingURL=errorHandler.js.map