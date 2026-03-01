import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { DatabaseFactory } from "../../../../lib/backend/core/db/DatabaseFactory";
import { User } from "../../../../lib/backend/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret_key_change_me_in_prod";

const db = DatabaseFactory.getDatabase();

export async function POST(req: NextRequest) {
    try {
        await db.connect();
        const { email, name, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            email,
            name,
            passwordHash,
        });

        await newUser.save();

        const token = jwt.sign(
            { email: newUser.email, name: newUser.name },
            JWT_SECRET,
            { expiresIn: "30d" }
        );

        return NextResponse.json({
            user: { email: newUser.email, name: newUser.name, token }
        }, { status: 201 });

    } catch (error) {
        console.error("POST /api/auth/signup Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
