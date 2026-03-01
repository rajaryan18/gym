import React, { useState } from "react";
import { Scale, Check, Loader2 } from "lucide-react";
import { useWeight } from "../hooks/useWeight";

export const WeightTracker: React.FC = () => {
    const [weight, setWeight] = useState<string>("");
    const [isSaved, setIsSaved] = useState(false);
    const { saveWeight, isLoading } = useWeight();

    const handleSave = async () => {
        if (!weight || isLoading) return;

        const numericWeight = parseFloat(weight);
        if (isNaN(numericWeight)) return;

        const success = await saveWeight(numericWeight);
        if (success) {
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
            setWeight("");
        }
    };

    return (
        <div className="bg-white border border-zinc-100 rounded-3xl p-6 shadow-sm flex flex-col shrink-0">
            <div className="flex items-center gap-2 mb-4">
                <Scale size={20} className="text-zinc-500" />
                <h2 className="text-lg font-bold text-black uppercase tracking-wider">Body Weight</h2>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative flex-1">
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="0.0"
                        step="0.1"
                        className="w-full bg-zinc-50 rounded-2xl px-4 py-4 text-2xl font-black text-center outline-none focus:ring-2 ring-black transition-all"
                        style={{ MozAppearance: "textfield" }}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">kg</span>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="h-[64px] w-[64px] bg-black text-white rounded-2xl flex items-center justify-center hover:bg-zinc-800 transition-all active:scale-95 shrink-0 disabled:opacity-50"
                >
                    {isLoading ? <Loader2 size={24} className="animate-spin" /> :
                        isSaved ? <Check size={24} className="text-green-400" /> :
                            <span className="font-bold text-sm">SAVE</span>}
                </button>
            </div>
        </div>
    );
};
