import { useState, useEffect, useCallback } from 'react';
import { IWorkoutSession } from '../../lib/backend/models/WorkoutSession';
import { useAuth } from '../context/AuthContext';

export const useWorkouts = () => {
    const { user } = useAuth();
    const [workouts, setWorkouts] = useState<IWorkoutSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchWorkouts = useCallback(async () => {
        if (!user?.email) return;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/workouts?email=${encodeURIComponent(user.email)}`);
            if (res.ok) {
                const data = await res.json();
                setWorkouts(data);
            }
        } catch (error) {
            console.error("Error fetching workouts:", error);
        } finally {
            setIsLoading(false);
        }
    }, [user?.email]);

    useEffect(() => {
        fetchWorkouts();
    }, [fetchWorkouts, user?.email]);

    const deleteWorkout = async (id: string) => {
        try {
            const res = await fetch(`/api/workouts/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                // Optimistic UI update
                setWorkouts(workouts.filter(w => w.sessionId !== id));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error deleting workout:", error);
            return false;
        }
    };

    return {
        workouts,
        isLoading,
        fetchWorkouts,
        deleteWorkout
    };
};
