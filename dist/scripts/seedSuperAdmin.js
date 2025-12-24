"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../config/database");
const SuperAdmin_model_1 = require("../models/SuperAdmin.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const createSuperAdmin = async () => {
    try {
        console.log('Connecting to database...');
        await (0, database_1.connectToDatabase)();
        console.log('Connected to database');
        const email = 'superadmin@admin.com';
        const password = 'SuperAdmin@123';
        // Check if exists
        const exists = await SuperAdmin_model_1.SuperAdminModel.findOne({ email });
        if (exists) {
            console.log('SuperAdmin already exists with email:', email);
            // Reset password if needed? For now just log it.
            process.exit(0);
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const superAdmin = new SuperAdmin_model_1.SuperAdminModel({
            firstName: 'Super',
            lastName: 'Admin',
            email,
            password: hashedPassword,
            isEmailVerified: true,
            phone: '1234567890'
        });
        await superAdmin.save();
        console.log('SuperAdmin created successfully');
        console.log('--------------------------------');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('--------------------------------');
        process.exit(0);
    }
    catch (error) {
        console.error('Error creating superadmin:', error);
        process.exit(1);
    }
};
createSuperAdmin();
//# sourceMappingURL=seedSuperAdmin.js.map