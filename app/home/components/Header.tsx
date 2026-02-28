import React from "react";
import { Dumbbell, Save } from "lucide-react";

export const Header: React.FC = () => {
    return (
        <header className="mb-12 flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-black mb-2 flex items-center gap-3">
                    <span className="p-2 bg-black text-white rounded-xl">
                        <Dumbbell size={28} />
                    </span>
                    Gym Log
                </h1>
                <p className="text-zinc-500 font-medium">Track your progress, build your legacy.</p>
            </div>
            <button
                className="p-3 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50 transition-all shadow-sm active:scale-95"
                aria-label="Save current workout"
            >
                <Save size={20} className="text-zinc-700" />
            </button>
        </header>
    );
};
