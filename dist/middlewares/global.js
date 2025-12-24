"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGlobalMiddlewares = registerGlobalMiddlewares;
function registerGlobalMiddlewares(app) {
    app.use((req, _res, next) => {
        // basic request id placeholder
        req.requestId = Math.random().toString(36).slice(2);
        next();
    });
}
//# sourceMappingURL=global.js.map