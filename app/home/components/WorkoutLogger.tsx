import React from "react";
import { Plus, Dumbbell } from "lucide-react";
import { ExerciseCard } from "./ExerciseCard";
import { useWorkoutLogger } from "../hooks/useWorkoutLogger";

export const WorkoutLogger: React.FC = () => {
    const {
        exercises,
        addExercise,
        removeExercise,
        updateExerciseName,
        addSet,
        removeSet,
        updateSet,
    } = useWorkoutLogger();

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-2">
                    <Dumbbell size={20} className="text-zinc-500" />
                    <h2 className="text-lg font-bold text-black uppercase tracking-wider">New Session</h2>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-8 custom-scrollbar pb-12">
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        onUpdateName={(name) => updateExerciseName(exercise.id, name)}
                        onRemove={() => removeExercise(exercise.id)}
                        onAddSet={() => addSet(exercise.id)}
                        onUpdateSet={(setId, field, value) => updateSet(exercise.id, setId, field, value)}
                        onRemoveSet={(setId) => removeSet(exercise.id, setId)}
                        isOnlyExercise={exercises.length === 1}
                    />
                ))}

                <button
                    onClick={addExercise}
                    className="w-full py-6 bg-black text-white rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all transform active:scale-[0.98] shadow-lg shadow-black/10 mt-4"
                >
                    <Plus size={20} />
                    Add Exercise
                </button>
            </div>
        </div>
    );
};
