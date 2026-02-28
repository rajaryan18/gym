"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Header } from "./components/Header";
import { ExerciseCard } from "./components/ExerciseCard";

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

export default function GymHome() {
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

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans selection:bg-blue-100">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Header />

        <div className="space-y-8">
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
            className="w-full py-6 bg-black text-white rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all transform active:scale-[0.98] shadow-lg shadow-black/10"
          >
            <Plus size={20} />
            Add New Exercise
          </button>
        </div>

        <footer className="mt-20 text-center">
          <p className="text-zinc-400 text-sm">
            Abstraction is the key to clarity.
            <span className="block mt-1 font-semibold text-zinc-500 opacity-50 uppercase tracking-[0.2em] text-[10px]">Gym App v1.0</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
