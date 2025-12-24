import dotenv from 'dotenv';
import { connectToDatabase } from '../config/database';
import { SuperAdminModel } from '../models/SuperAdmin.model';
import bcrypt from 'bcryptjs';

dotenv.config();

const createSuperAdmin = async () => {
    try {
        console.log('Connecting to database...');
        await connectToDatabase();
        console.log('Connected to database');

        const email = 'superadmin@admin.com';
        const password = 'SuperAdmin@123';

        // Check if exists
        const exists = await SuperAdminModel.findOne({ email });
        if (exists) {
            console.log('SuperAdmin already exists with email:', email);
            // Reset password if needed? For now just log it.
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const superAdmin = new SuperAdminModel({
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
    } catch (error) {
        console.error('Error creating superadmin:', error);
        process.exit(1);
    }
};

createSuperAdmin();
