import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { DatabaseFactory } from "../../../../lib/backend/core/db/DatabaseFactory";
import { User } from "../../../../lib/backend/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret_key_change_me_in_prod";

const db = DatabaseFactory.getDatabase();

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign(
            { email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: "30d" }
        );

        return NextResponse.json({
            user: { userId: user._id, email: user.email, name: user.name, token }
        }, { status: 200 });

    } catch (error) {
        console.error("POST /api/auth/login Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
