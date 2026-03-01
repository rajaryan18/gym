import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export const useWeight = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [weightHistory, setWeightHistory] = useState<any[]>([]);

    const saveWeight = async (weight: number) => {
        if (!user?.email) return false;

        setIsLoading(true);
        try {
            const res = await fetch('/api/weight', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ weight, email: user.email })
            });
            return res.ok;
        } catch (error) {
            console.error("Error saving weight:", error);
            return false;
        } finally {
            setIsLoading(false);
            // Refresh history after save
            fetchWeightHistory();
        }
    };

    const fetchWeightHistory = useCallback(async () => {
        if (!user?.email) return;
        try {
            const res = await fetch(`/api/weight?email=${encodeURIComponent(user.email)}`);
            if (res.ok) {
                const data = await res.json();
                setWeightHistory(data);
            }
        } catch (error) {
            console.error("Error fetching weight history:", error);
        }
    }, [user?.email]);

    return {
        saveWeight,
        fetchWeightHistory,
        weightHistory,
        isLoading
    };
};
