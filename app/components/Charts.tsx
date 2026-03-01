import React, { useEffect, useMemo } from 'react';
import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useWorkouts } from '../hooks/useWorkouts';
import { useWeight } from '../hooks/useWeight';

export const Charts: React.FC = () => {
    const { workouts } = useWorkouts();
    const { weightHistory, fetchWeightHistory } = useWeight();

    useEffect(() => {
        fetchWeightHistory();
    }, [fetchWeightHistory]);

    // Format weight data for LineChart
    const weightChartData = useMemo(() => {
        if (!weightHistory) return [];
        return weightHistory.map(entry => ({
            date: new Date(entry.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' }),
            weight: entry.weight
        }));
    }, [weightHistory]);

    // Format workout data for BarChart (Total volume per session)
    const workoutChartData = useMemo(() => {
        if (!workouts) return [];
        // Group and summarize by session date
        const data = workouts.map(session => {
            let totalVolume = 0;
            session.exercises.forEach(ex => {
                ex.sets.forEach(set => {
                    const weight = parseFloat(set.weight) || 0;
                    const reps = parseInt(set.reps) || 0;
                    totalVolume += (weight * reps);
                });
            });

            return {
                date: new Date(session.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' }),
                volume: totalVolume
            };
        });

        // Reverse to show chronological order
        return data.reverse();
    }, [workouts]);

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Body Weight Over Time */}
            <div className="bg-white border border-zinc-100 rounded-3xl p-6 shadow-sm flex flex-col min-w-0">
                <h2 className="text-lg font-bold text-black uppercase tracking-wider mb-6">Body Weight History</h2>
                <div className="h-[250px] w-full">
                    {weightChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weightChartData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a1a1aa' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a1a1aa' }} domain={['dataMin - 5', 'dataMax + 5']} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#000', fontWeight: 'bold' }}
                                />
                                <Line type="monotone" dataKey="weight" name="Weight (kg)" stroke="#000000" strokeWidth={3} dot={{ r: 4, fill: '#000000' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-zinc-400 font-medium text-sm">
                            Not enough data to display chart.
                        </div>
                    )}
                </div>
            </div>

            {/* Workout Volume */}
            <div className="bg-white border border-zinc-100 rounded-3xl p-6 shadow-sm flex flex-col min-w-0">
                <h2 className="text-lg font-bold text-black uppercase tracking-wider mb-6">Total Volume History</h2>
                <div className="h-[250px] w-full">
                    {workoutChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={workoutChartData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a1a1aa' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a1a1aa' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f4f4f5' }}
                                    itemStyle={{ color: '#000', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="volume" name="Volume (kg)" fill="#000000" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-zinc-400 font-medium text-sm">
                            Not enough data to display chart.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
