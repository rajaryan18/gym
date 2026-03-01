import mongoose, { Document, Schema } from 'mongoose';

export interface IWeightLog extends Document {
    weightId: string;
    userId: string;
    email?: string;
    weight: number;
    unit: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

const WeightLogSchema: Schema = new Schema({
    weightId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    email: { type: String, required: false },
    weight: { type: Number, required: true },
    unit: { type: String, default: 'kg' },
    date: { type: Date, required: true, default: Date.now }
}, {
    timestamps: true
});

// Avoid OverwriteModelError in Next.js development
export const WeightLog = mongoose.models.WeightLog || mongoose.model<IWeightLog>('WeightLog', WeightLogSchema);
