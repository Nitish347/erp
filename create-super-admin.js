const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Super Admin Schema
const SuperAdminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

const SuperAdminModel = mongoose.models.SuperAdmin || mongoose.model('SuperAdmin', SuperAdminSchema);

// Credentials
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
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Check if super admin already exists
    const existingSuperAdmin = await SuperAdminModel.findOne({ 
      email: SUPER_ADMIN_CREDENTIALS.email 
    });

    if (existingSuperAdmin) {
      console.log('⚠️  Super Admin already exists!');
      console.log('==========================================');
      console.log('Email:', SUPER_ADMIN_CREDENTIALS.email);
      console.log('Password:', SUPER_ADMIN_CREDENTIALS.password);
      console.log('ID:', existingSuperAdmin._id);
      console.log('==========================================');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(SUPER_ADMIN_CREDENTIALS.password, 12);

    // Create super admin
    const superAdmin = new SuperAdminModel({
      firstName: SUPER_ADMIN_CREDENTIALS.firstName,
      lastName: SUPER_ADMIN_CREDENTIALS.lastName,
      email: SUPER_ADMIN_CREDENTIALS.email,
      password: hashedPassword,
      phone: SUPER_ADMIN_CREDENTIALS.phone,
      isEmailVerified: SUPER_ADMIN_CREDENTIALS.isEmailVerified
    });

    await superAdmin.save();

    console.log('\n✅ ✅ ✅ SUPER ADMIN CREATED SUCCESSFULLY! ✅ ✅ ✅\n');
    console.log('==========================================');
    console.log('📧 Email:', SUPER_ADMIN_CREDENTIALS.email);
    console.log('🔑 Password:', SUPER_ADMIN_CREDENTIALS.password);
    console.log('🆔 ID:', superAdmin._id);
    console.log('==========================================\n');
    console.log('🔐 Login Endpoint: POST /api/v1/auth/login/super-admin');
    console.log('\n📝 Request Body:');
    console.log(JSON.stringify({
      email: SUPER_ADMIN_CREDENTIALS.email,
      password: SUPER_ADMIN_CREDENTIALS.password
    }, null, 2));
    console.log('\n⚠️  IMPORTANT: Change password after first login!\n');

    // Close connection
    await mongoose.connection.close();
    console.log('✅ Database connection closed\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating super admin:', error);
    process.exit(1);
  }
}

// Run the script
createSuperAdmin();
