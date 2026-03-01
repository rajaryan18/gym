"use client";

import React, { useState } from "react";
import { Dumbbell, Loader2, Mail, Lock, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
        const body = isLogin ? { email, password } : { email, password, name };

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (res.ok) {
                login(data.user);
            } else {
                setError(data.error || "Authentication failed.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 selection:bg-black selection:text-white">
            <div className="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-bl-full -z-10 opacity-50"></div>

                <div className="flex flex-col items-center mb-8">
                    <div className="h-14 w-14 bg-black rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-black/10">
                        <Dumbbell size={28} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-black text-black uppercase tracking-widest">
                        {isLogin ? "Welcome Back" : "Join the Club"}
                    </h1>
                    <p className="text-zinc-400 text-sm mt-2 font-medium">
                        Premium tracking for premium athletes.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-semibold text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-zinc-50 text-black px-12 py-4 rounded-2xl font-semibold outline-none focus:ring-2 ring-black transition-all placeholder:font-medium placeholder:text-zinc-400"
                                required
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-50 text-black px-12 py-4 rounded-2xl font-semibold outline-none focus:ring-2 ring-black transition-all placeholder:font-medium placeholder:text-zinc-400"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-50 text-black px-12 py-4 rounded-2xl font-semibold outline-none focus:ring-2 ring-black transition-all placeholder:font-medium placeholder:text-zinc-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white font-bold py-4 rounded-2xl uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 mt-6 shadow-lg shadow-black/10"
                    >
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : null}
                        {isLogin ? "Sign In" : "Create Account"}
                    </button>
                </form>

                <div className="mt-8 text-center bg-zinc-50 py-4 rounded-2xl border border-zinc-100">
                    <p className="text-zinc-500 text-sm font-medium">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError(null);
                            }}
                            className="ml-2 font-bold text-black hover:underline underline-offset-4 decoration-2"
                        >
                            {isLogin ? "Sign Up" : "Log In"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
