import { useState } from "react";

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
    const [exercises, setExercises] = useState<Exercise[]>([
        {
            id: "1",
            name: "",
            sets: [{ id: "s1", weight: "", reps: "" }],
        },
    ]);

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

    return {
        exercises,
        addExercise,
        removeExercise,
        updateExerciseName,
        addSet,
        removeSet,
        updateSet,
    };
};
