import mongoose from 'mongoose';

export async function connectToDatabase(): Promise<void> {
  const databaseUri = process.env.MONGO_URI;
  if (!databaseUri) {
    throw new Error('Missing MONGO_URI in environment');
  }

  await mongoose.connect(databaseUri);
}


