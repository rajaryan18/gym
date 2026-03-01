import { NextRequest, NextResponse } from "next/server";
import { DatabaseFactory } from "../../../../lib/backend/core/db/DatabaseFactory";
import { WorkoutSession } from "../../../../lib/backend/models/WorkoutSession";

const db = DatabaseFactory.getDatabase();

// Utility function to extract parameter from URL pathname
function getIdFromRequest(req: NextRequest) {
    const url = new URL(req.url);
    const parts = url.pathname.split('/');
    return parts[parts.length - 1];
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        await db.connect();
        const { id } = await context.params;

        const deletedSession = await WorkoutSession.findOneAndDelete({ sessionId: id });

        if (!deletedSession) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Session deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("DELETE /api/workouts/[id] Error:", error);
        return NextResponse.json({ error: "Failed to delete session" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        await db.connect();
        const { id } = await context.params;
        const body = await req.json();

        const updatedSession = await WorkoutSession.findOneAndUpdate(
            { sessionId: id },
            { $set: body },
            { new: true }
        );

        if (!updatedSession) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }

        return NextResponse.json(updatedSession, { status: 200 });

    } catch (error) {
        console.error("PUT /api/workouts/[id] Error:", error);
        return NextResponse.json({ error: "Failed to update session" }, { status: 500 });
    }
}
