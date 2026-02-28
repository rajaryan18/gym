import React from "react";
import { Calendar, ChevronRight } from "lucide-react";

interface WorkoutSummary {
    id: string;
    date: string;
    exercises: string[];
    totalSets: number;
}

const DUMMY_LOGS: WorkoutSummary[] = [
    { id: "1", date: "Today, Mar 1", exercises: ["Bench Press", "Squats"], totalSets: 8 },
    { id: "2", date: "Yesterday, Feb 28", exercises: ["Deadlifts", "Pull-ups", "Curls"], totalSets: 12 },
    { id: "3", date: "Thursday, Feb 27", exercises: ["Shoulder Press", "Lateral Raises"], totalSets: 10 },
    { id: "4", date: "Wednesday, Feb 26", exercises: ["Running", "Plank"], totalSets: 5 },
    { id: "5", date: "Tuesday, Feb 25", exercises: ["Incline Bench", "Tricep Pushdowns"], totalSets: 9 },
];

export const WeeklyLog: React.FC = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6 px-2">
                <Calendar size={20} className="text-zinc-500" />
                <h2 className="text-lg font-bold text-black uppercase tracking-wider">Weekly Activity</h2>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                {DUMMY_LOGS.map((log) => (
                    <div
                        key={log.id}
                        className="group bg-white border border-zinc-100 rounded-2xl p-4 hover:border-zinc-300 transition-all cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-bold text-zinc-800">{log.date}</span>
                            <span className="text-[10px] font-bold bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full uppercase">
                                {log.totalSets} Sets
                            </span>
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-1">
                            {log.exercises.join(" • ")}
                        </p>
                        <div className="mt-3 flex items-center text-[10px] font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity">
                            VIEW DETAILS <ChevronRight size={12} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
