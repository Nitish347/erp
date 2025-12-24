"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const global_1 = require("./middlewares/global");
const routes_1 = require("./routes");
const errorHandler_1 = require("./middlewares/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, global_1.registerGlobalMiddlewares)(app);
(0, routes_1.registerRoutes)(app);
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
(0, database_1.connectToDatabase)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        // Server started
    });
})
    .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to database', error);
    process.exit(1);
});
exports.default = app;
//# sourceMappingURL=index.js.map