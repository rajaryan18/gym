import { NextResponse } from "next/server";
import { DatabaseFactory } from "../../../../lib/backend/core/db/DatabaseFactory";
import { ExerciseDictionary } from "../../../../lib/backend/models/ExerciseDictionary";

const db = DatabaseFactory.getDatabase();

const defaultExercises = [
    { name: "Bench Press (Barbell)", targetMuscle: "Chest" },
    { name: "Incline Bench Press (Dumbbell)", targetMuscle: "Chest" },
    { name: "Push-ups", targetMuscle: "Chest" },
    { name: "Cable Crossover", targetMuscle: "Chest" },
    { name: "Deadlift (Barbell)", targetMuscle: "Back" },
    { name: "Pull-ups", targetMuscle: "Back" },
    { name: "Lat Pulldown (Cable)", targetMuscle: "Back" },
    { name: "Barbell Row", targetMuscle: "Back" },
    { name: "Overhead Press (Dumbbell)", targetMuscle: "Shoulders" },
    { name: "Lateral Raise (Dumbbell)", targetMuscle: "Shoulders" },
    { name: "Front Raise", targetMuscle: "Shoulders" },
    { name: "Squat (Barbell)", targetMuscle: "Legs" },
    { name: "Leg Press", targetMuscle: "Legs" },
    { name: "Romanian Deadlift (Dumbbell)", targetMuscle: "Legs" },
    { name: "Calf Raise", targetMuscle: "Legs" },
    { name: "Bicep Curl (Dumbbell)", targetMuscle: "Arms" },
    { name: "Tricep Extension (Cable)", targetMuscle: "Arms" },
    { name: "Hammer Curl", targetMuscle: "Arms" },
    { name: "Crunch", targetMuscle: "Core" },
    { name: "Plank", targetMuscle: "Core" }
];

export async function POST() {
    try {
        await db.connect();

        let addedCount = 0;

        for (const ex of defaultExercises) {
            // Check if it already exists to avoid duplicates
            const exists = await ExerciseDictionary.findOne({ name: ex.name, isCustom: false });

            if (!exists) {
                await ExerciseDictionary.create({
                    name: ex.name,
                    targetMuscle: ex.targetMuscle,
                    isCustom: false
                });
                addedCount++;
            }
        }

        return NextResponse.json({
            message: `Successfully seeded ${addedCount} new default exercises.`,
            totalDefaults: await ExerciseDictionary.countDocuments({ isCustom: false })
        }, { status: 200 });

    } catch (error) {
        console.error("POST /api/exercises/seed Error:", error);
        return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
    }
}
