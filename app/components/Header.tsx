import React from "react";
import { Dumbbell, Plus } from "lucide-react";

interface HeaderProps {
    onAddSessionClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddSessionClick }) => {
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
                onClick={onAddSessionClick}
                className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-2xl font-bold shadow-lg shadow-black/10 active:scale-95 transition-all"
                aria-label="Add new session"
            >
                <Plus size={20} />
                <span className="text-sm">Add Session</span>
            </button>
        </header>
    );
};
