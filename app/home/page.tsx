"use client";

import React from "react";
import { Header } from "./components/Header";
import { WeeklyLog } from "./components/WeeklyLog";
import { WorkoutLogger } from "./components/WorkoutLogger";

export default function GymHome() {
  return (
    <div className="h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans selection:bg-blue-100 overflow-hidden flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col h-full">
        <Header />

        <div className="flex flex-col md:flex-row gap-12 flex-1 overflow-hidden">
          {/* Left Column: Weekly Log */}
          <aside className="w-full md:w-1/3 flex flex-col min-h-0">
            <WeeklyLog />
          </aside>

          {/* Vertical Divider for Desktop */}
          <div className="hidden md:block w-px bg-zinc-100 self-stretch"></div>

          {/* Right Column: Workout Logger */}
          <main className="w-full md:w-2/3 flex flex-col min-h-0">
            <WorkoutLogger />
          </main>
        </div>

        <footer className="mt-8 text-center shrink-0">
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
