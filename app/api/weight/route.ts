import { NextRequest, NextResponse } from "next/server";
import { DatabaseFactory } from "../../../lib/backend/core/db/DatabaseFactory";
import { WeightLog } from "../../../lib/backend/models/WeightLog";

const db = DatabaseFactory.getDatabase();

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const email = url.searchParams.get("email");

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Get the weight history sorted by date
        const weightHistory = await WeightLog.find({ email }).sort({ date: 1 });
        return NextResponse.json(weightHistory, { status: 200 });

    } catch (error) {
        console.error("GET /api/weight Error:", error);
        return NextResponse.json({ error: "Failed to fetch weight" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const userId = "user-1"; // Keeping for backwards compatibility right now
        const weightId = Math.random().toString(36).substr(2, 9);

        if (!body.email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const newWeightLog = new WeightLog({
            weightId,
            userId,
            email: body.email,
            weight: body.weight,
        });

        await newWeightLog.save();
        return NextResponse.json(newWeightLog, { status: 201 });

    } catch (error) {
        console.error("POST /api/weight Error:", error);
        return NextResponse.json({ error: "Failed to save weight log" }, { status: 500 });
    }
}
