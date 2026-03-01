import mongoose, { Document, Schema } from 'mongoose';

export interface IExerciseDictionary extends Document {
    name: string;
    targetMuscle: string;
    isCustom: boolean; // True if it's user-added, false if it's a globally seeded default
    createdByEmail?: string; // If 'isCustom' is true, which user owns it
    createdAt: Date;
    updatedAt: Date;
}

const ExerciseDictionarySchema: Schema = new Schema({
    name: { type: String, required: true },
    targetMuscle: { type: String, required: true },
    isCustom: { type: Boolean, default: false },
    createdByEmail: { type: String, required: false },
}, {
    timestamps: true
});

// Avoid OverwriteModelError in Next.js development
export const ExerciseDictionary = mongoose.models.ExerciseDictionary || mongoose.model<IExerciseDictionary>('ExerciseDictionary', ExerciseDictionarySchema);
