import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export interface Set {
    id: string;
    weight: string;
    reps: string;
}

export interface Exercise {
    id: string;
    name: string;
    sets: Set[];
}

export const useWorkoutLogger = () => {
    const { user } = useAuth();
    const [exercises, setExercises] = useState<Exercise[]>([
        {
            id: "1",
            name: "",
            sets: [{ id: "s1", weight: "", reps: "" }],
        },
    ]);
    const [workoutTime, setWorkoutTime] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);

    const addExercise = () => {
        setExercises([
            ...exercises,
            {
                id: Math.random().toString(36).substr(2, 9),
                name: "",
                sets: [{ id: Math.random().toString(36).substr(2, 9), weight: "", reps: "" }],
            },
        ]);
    };

    const removeExercise = (id: string) => {
        setExercises(exercises.filter((ex) => ex.id !== id));
    };

    const updateExerciseName = (id: string, name: string) => {
        setExercises(
            exercises.map((ex) => (ex.id === id ? { ...ex, name } : ex))
        );
    };

    const addSet = (exerciseId: string) => {
        setExercises(
            exercises.map((ex) => {
                if (ex.id === exerciseId) {
                    return {
                        ...ex,
                        sets: [
                            ...ex.sets,
                            {
                                id: Math.random().toString(36).substr(2, 9),
                                weight: "",
                                reps: "",
                            },
                        ],
                    };
                }
                return ex;
            })
        );
    };

    const removeSet = (exerciseId: string, setId: string) => {
        setExercises(
            exercises.map((ex) => {
                if (ex.id === exerciseId) {
                    return {
                        ...ex,
                        sets: ex.sets.filter((s) => s.id !== setId),
                    };
                }
                return ex;
            })
        );
    };

    const updateSet = (
        exerciseId: string,
        setId: string,
        field: "weight" | "reps",
        value: string
    ) => {
        setExercises(
            exercises.map((ex) => {
                if (ex.id === exerciseId) {
                    return {
                        ...ex,
                        sets: ex.sets.map((s) => (s.id === setId ? { ...s, [field]: value } : s)),
                    };
                }
                return ex;
            })
        );
    };

    const saveWorkout = async () => {
        if (!exercises || exercises.length === 0 || !user?.email) return false;

        setIsSaving(true);
        try {
            const res = await fetch('/api/workouts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ exercises, workoutTime, email: user.email })
            });

            if (res.ok) {
                // Reset form on success
                setExercises([{ id: Math.random().toString(36).substr(2, 9), name: "", sets: [{ id: Math.random().toString(36).substr(2, 9), weight: "", reps: "" }] }]);
                setWorkoutTime("");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error saving workout:", error);
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    return {
        exercises,
        workoutTime,
        isSaving,
        setWorkoutTime,
        addExercise,
        removeExercise,
        updateExerciseName,
        addSet,
        removeSet,
        updateSet,
        saveWorkout,
    };
};
