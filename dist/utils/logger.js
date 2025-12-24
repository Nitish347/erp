"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInfo = logInfo;
exports.logError = logError;
function logInfo(message, extra) {
    // eslint-disable-next-line no-console
    console.log(message, extra ?? '');
}
function logError(message, extra) {
    // eslint-disable-next-line no-console
    console.error(message, extra ?? '');
}
//# sourceMappingURL=logger.js.map