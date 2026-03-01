import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export interface IDictionaryExercise {
    _id: string;
    name: string;
    targetMuscle: string;
    isCustom: boolean;
}

export const useExerciseLibrary = () => {
    const { user } = useAuth();
    const [library, setLibrary] = useState<IDictionaryExercise[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchLibrary = useCallback(async () => {
        if (!user?.email) return;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/exercises?email=${encodeURIComponent(user.email)}`);
            if (res.ok) {
                const data = await res.json();
                setLibrary(data);
            }
        } catch (error) {
            console.error("Error fetching exercise library:", error);
        } finally {
            setIsLoading(false);
        }
    }, [user?.email]);

    useEffect(() => {
        fetchLibrary();
    }, [fetchLibrary]);

    const addCustomExercise = async (name: string, targetMuscle: string) => {
        if (!user?.email) return false;

        try {
            const res = await fetch('/api/exercises', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, targetMuscle, email: user.email })
            });

            if (res.ok) {
                // Refresh library to include the new custom exercise
                await fetchLibrary();
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error adding custom exercise:", error);
            return false;
        }
    };

    return {
        library,
        isLoading,
        addCustomExercise
    };
};
