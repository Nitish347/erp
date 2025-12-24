"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDatabase() {
    const databaseUri = process.env.MONGO_URI;
    if (!databaseUri) {
        throw new Error('Missing MONGO_URI in environment');
    }
    //
    await mongoose_1.default.connect(databaseUri);
}
//# sourceMappingURL=database.js.map