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

        const handleUpdate = () => {
            fetchWorkouts();
        };

        window.addEventListener('gym:workout_updated', handleUpdate);
        return () => window.removeEventListener('gym:workout_updated', handleUpdate);
    }, [fetchWorkouts, user?.email]);

    const deleteWorkout = async (id: string) => {
        try {
            const res = await fetch(`/api/workouts/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                // Optimistic UI update
                setWorkouts(workouts.filter(w => w.sessionId !== id));
                window.dispatchEvent(new CustomEvent('gym:workout_updated'));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error deleting workout:", error);
            return false;
        }
    };

    const updateWorkout = async (id: string, data: any) => {
        try {
            const res = await fetch(`/api/workouts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                window.dispatchEvent(new CustomEvent('gym:workout_updated'));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error updating workout:", error);
            return false;
        }
    };

    return {
        workouts,
        isLoading,
        fetchWorkouts,
        deleteWorkout,
        updateWorkout
    };
};
