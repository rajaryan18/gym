import mongoose, { Document, Schema } from 'mongoose';

// Matching the frontend hook interfaces closely
export interface ISet {
    setId: string;
    weight: string;
    reps: string;
}

export interface IExercise {
    exerciseId: string;
    name: string;
    sets: ISet[];
}

export interface IWorkoutSession extends Document {
    sessionId: string;
    userId: string;
    email?: string;
    date: Date;
    workoutTime: string;
    exercises: IExercise[];
    createdAt: Date;
    updatedAt: Date;
}

const SetSchema: Schema = new Schema({
    setId: { type: String, required: true },
    weight: { type: String, required: false },
    reps: { type: String, required: false }
}, { _id: false });

const ExerciseSchema: Schema = new Schema({
    exerciseId: { type: String, required: true },
    name: { type: String, required: false },
    sets: { type: [SetSchema], default: [] }
}, { _id: false });

const WorkoutSessionSchema: Schema = new Schema({
    sessionId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    email: { type: String, required: false },
    date: { type: Date, required: true, default: Date.now },
    workoutTime: { type: String, required: false },
    exercises: { type: [ExerciseSchema], default: [] }
}, {
    timestamps: true
});

// Avoid OverwriteModelError in Next.js development
export const WorkoutSession = mongoose.models.WorkoutSession || mongoose.model<IWorkoutSession>('WorkoutSession', WorkoutSessionSchema);
