"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SuperAdmin_model_1 = require("../models/SuperAdmin.model");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const SUPER_ADMIN_CREDENTIALS = {
    firstName: 'Super',
    lastName: 'Admin',
    email: 'superadmin@campuscare.com',
    password: 'SuperAdmin@123',
    phone: '+1234567890',
    isEmailVerified: true
};
async function createSuperAdmin() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/campus_care';
        await mongoose_1.default.connect(mongoUri);
        console.log('✅ Connected to MongoDB');
        // Check if super admin already exists
        const existingSuperAdmin = await SuperAdmin_model_1.SuperAdminModel.findOne({
            email: SUPER_ADMIN_CREDENTIALS.email
        });
        if (existingSuperAdmin) {
            console.log('⚠️  Super Admin already exists with email:', SUPER_ADMIN_CREDENTIALS.email);
            console.log('Existing Super Admin ID:', existingSuperAdmin._id);
            await mongoose_1.default.connection.close();
            return;
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(SUPER_ADMIN_CREDENTIALS.password, 12);
        // Create super admin
        const superAdmin = new SuperAdmin_model_1.SuperAdminModel({
            firstName: SUPER_ADMIN_CREDENTIALS.firstName,
            lastName: SUPER_ADMIN_CREDENTIALS.lastName,
            email: SUPER_ADMIN_CREDENTIALS.email,
            password: hashedPassword,
            phone: SUPER_ADMIN_CREDENTIALS.phone,
            isEmailVerified: SUPER_ADMIN_CREDENTIALS.isEmailVerified
        });
        await superAdmin.save();
        console.log('\n✅ Super Admin created successfully!');
        console.log('==========================================');
        console.log('Super Admin Credentials:');
        console.log('Email:', SUPER_ADMIN_CREDENTIALS.email);
        console.log('Password:', SUPER_ADMIN_CREDENTIALS.password);
        console.log('ID:', superAdmin._id);
        console.log('==========================================\n');
        console.log('⚠️  IMPORTANT: Please change the password after first login!');
        console.log('\nLogin endpoint: POST /api/v1/auth/login/super-admin');
        console.log('Request body: { "email": "superadmin@campuscare.com", "password": "SuperAdmin@123" }\n');
        // Close connection
        await mongoose_1.default.connection.close();
        console.log('✅ Database connection closed');
    }
    catch (error) {
        console.error('❌ Error creating super admin:', error);
        process.exit(1);
    }
}
// Run the script
createSuperAdmin();
//# sourceMappingURL=create-super-admin.js.map