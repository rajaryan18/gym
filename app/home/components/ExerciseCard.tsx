import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { SetRow } from "./SetRow";

interface Set {
    id: string;
    weight: string;
    reps: string;
}

interface Exercise {
    id: string;
    name: string;
    sets: Set[];
}

interface ExerciseCardProps {
    exercise: Exercise;
    onUpdateName: (name: string) => void;
    onRemove: () => void;
    onAddSet: () => void;
    onUpdateSet: (setId: string, field: "weight" | "reps", value: string) => void;
    onRemoveSet: (setId: string) => void;
    isOnlyExercise: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
    exercise,
    onUpdateName,
    onRemove,
    onAddSet,
    onUpdateSet,
    onRemoveSet,
    isOnlyExercise,
}) => {
    return (
        <section className="bg-white border border-zinc-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-6">
                <div className="flex-1 mr-4">
                    <input
                        type="text"
                        placeholder="Exercise Name (e.g. Bench Press)"
                        value={exercise.name}
                        onChange={(e) => onUpdateName(e.target.value)}
                        className="w-full text-xl font-semibold bg-transparent border-none focus:ring-0 placeholder:text-zinc-300 p-0"
                    />
                    <div className="h-0.5 w-0 group-focus-within:w-full bg-black transition-all duration-300 mt-1"></div>
                </div>
                {!isOnlyExercise && (
                    <button
                        onClick={onRemove}
                        className="text-zinc-300 hover:text-red-500 transition-colors p-2"
                    >
                        <Trash2 size={18} />
                    </button>
                )}
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-12 gap-4 px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    <div className="col-span-1">Set</div>
                    <div className="col-span-5">Weight (kg)</div>
                    <div className="col-span-5">Reps</div>
                    <div className="col-span-1"></div>
                </div>

                {exercise.sets.map((set, setIndex) => (
                    <SetRow
                        key={set.id}
                        index={setIndex}
                        weight={set.weight}
                        reps={set.reps}
                        onUpdate={(field, value) => onUpdateSet(set.id, field, value)}
                        onRemove={() => onRemoveSet(set.id)}
                        isOnlySet={exercise.sets.length === 1}
                    />
                ))}

                <button
                    onClick={onAddSet}
                    className="w-full mt-4 py-3 border-2 border-dashed border-zinc-100 rounded-2xl text-zinc-400 text-sm font-medium hover:border-zinc-200 hover:text-zinc-600 transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={16} />
                    Add Set
                </button>
            </div>
        </section>
    );
};
