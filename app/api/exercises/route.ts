import { NextRequest, NextResponse } from "next/server";
import { DatabaseFactory } from "../../../lib/backend/core/db/DatabaseFactory";
import { ExerciseDictionary } from "../../../lib/backend/models/ExerciseDictionary";

const db = DatabaseFactory.getDatabase();

export async function GET(req: NextRequest) {
    try {
        await db.connect();

        const url = new URL(req.url);
        const email = url.searchParams.get("email");

        // We want to fetch all global default exercises (isCustom: false)
        // PLUS any custom exercises created by this specific user
        const query = email
            ? { $or: [{ isCustom: false }, { isCustom: true, createdByEmail: email }] }
            : { isCustom: false };

        const exercises = await ExerciseDictionary.find(query).sort({ name: 1 });
        return NextResponse.json(exercises, { status: 200 });

    } catch (error) {
        console.error("GET /api/exercises Error:", error);
        return NextResponse.json({ error: "Failed to fetch exercises" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await db.connect();

        const body = await req.json();

        if (!body.name || !body.targetMuscle || !body.email) {
            return NextResponse.json({ error: "Missing required fields (name, targetMuscle, email)" }, { status: 400 });
        }

        // Add user-specific custom exercise
        const newExercise = new ExerciseDictionary({
            name: body.name,
            targetMuscle: body.targetMuscle,
            isCustom: true,
            createdByEmail: body.email
        });

        await newExercise.save();
        return NextResponse.json(newExercise, { status: 201 });

    } catch (error) {
        console.error("POST /api/exercises Error:", error);
        return NextResponse.json({ error: "Failed to create exercise" }, { status: 500 });
    }
}
