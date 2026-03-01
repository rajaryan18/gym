import { NextRequest, NextResponse } from "next/server";
import { DatabaseFactory } from "../../../lib/backend/core/db/DatabaseFactory";
import { WorkoutSession } from "../../../lib/backend/models/WorkoutSession";

const db = DatabaseFactory.getDatabase();

export async function GET(req: NextRequest) {
    try {
        // Extract email from query params
        const url = new URL(req.url);
        const email = url.searchParams.get("email");

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const sessions = await WorkoutSession.find({ email }).sort({ date: -1 });
        return NextResponse.json(sessions, { status: 200 });

    } catch (error) {
        console.error("GET /api/workouts Error:", error);
        return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const sessionId = Math.random().toString(36).substr(2, 9);

        const newSession = new WorkoutSession({
            ...body,
            sessionId,
        });

        await newSession.save();
        return NextResponse.json(newSession, { status: 201 });

    } catch (error) {
        console.error("POST /api/workouts Error:", error);
        return NextResponse.json({ error: "Failed to save session" }, { status: 500 });
    }
}
