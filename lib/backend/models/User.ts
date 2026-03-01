import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    passwordHash: string;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: false }
}, {
    timestamps: true
});

// Avoid OverwriteModelError in Next.js development
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
