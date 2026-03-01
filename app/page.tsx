"use client";

import React, { useState } from "react";
import { Header } from "./components/Header";
import { WeeklyLog } from "./components/WeeklyLog";
import { WorkoutLogger } from "./components/WorkoutLogger";
import { WeightTracker } from "./components/WeightTracker";
import { Charts } from "./components/Charts";
import { X, BarChart3, ListFilter } from "lucide-react";

export default function GymHome() {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'logs' | 'charts'>('logs');

  return (
    <div className="bg-[#FAFAFA] text-[#1A1A1A] font-sans selection:bg-blue-100 flex flex-col min-h-screen md:h-[100dvh] md:overflow-hidden relative">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-8 flex flex-col flex-1 md:h-full">
        <Header onAddSessionClick={() => setIsMobileModalOpen(true)} />

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 flex-1 md:overflow-hidden mt-6 md:mt-0">
          {/* Left Column: Stats & Tracking */}
          <aside className="w-full md:w-2/5 flex flex-col gap-6 md:min-h-0">
            <WeightTracker />

            <div className="bg-white border border-zinc-100 rounded-3xl p-2 shadow-sm flex items-center justify-between">
              <button
                onClick={() => setActiveTab('logs')}
                className={`flex-1 flex justify-center items-center gap-2 py-3 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'logs' ? 'bg-black text-white' : 'text-zinc-400 hover:text-black'}`}
              >
                <ListFilter size={18} /> History
              </button>
              <button
                onClick={() => setActiveTab('charts')}
                className={`flex-1 flex justify-center items-center gap-2 py-3 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'charts' ? 'bg-black text-white' : 'text-zinc-400 hover:text-black'}`}
              >
                <BarChart3 size={18} /> Charts
              </button>
            </div>

            {activeTab === 'logs' ? (
              <div className="h-[350px] md:h-auto md:flex-1 md:min-h-0 md:overflow-hidden">
                <WeeklyLog />
              </div>
            ) : (
              <div className="md:h-auto md:flex-1 md:min-h-0 md:overflow-y-auto custom-scrollbar">
                <Charts />
              </div>
            )}
          </aside>

          {/* Vertical Divider for Desktop */}
          <div className="hidden md:block w-px bg-zinc-100 self-stretch"></div>

          {/* Right Column: Workout Logger (Hidden on mobile unless modal is open) */}
          <main
            className={`
              w-full md:w-3/5 flex flex-col h-[600px] md:h-auto md:min-h-0 overflow-hidden mb-6 md:mb-0
              ${isMobileModalOpen ? 'fixed inset-0 z-50 bg-[#FAFAFA] p-4 sm:p-6 h-[100dvh] m-0 mb-0' : 'hidden md:flex'}
            `}
          >
            {isMobileModalOpen && (
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h2 className="text-xl font-bold uppercase tracking-wider">Log Session</h2>
                <button
                  onClick={() => setIsMobileModalOpen(false)}
                  className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 active:scale-95 transition-all text-zinc-600"
                >
                  <X size={24} />
                </button>
              </div>
            )}
            <WorkoutLogger onClose={() => setIsMobileModalOpen(false)} />
          </main>
        </div>

        <footer className="mt-4 md:mt-8 text-center shrink-0">
          <p className="text-zinc-400 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-50">
            Gym App • Premium Tracking • v1.1
          </p>
        </footer>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4d4d8;
        }
      `}</style>
    </div>
  );
}
