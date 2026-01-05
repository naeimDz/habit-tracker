'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import { Habit } from '@/types/habit';

interface HabitCardProps {
    habit: Habit;
    onToggle: (dayIndex: number) => void;
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function HabitCard({ habit, onToggle }: HabitCardProps) {
    // Calculate progress
    const completedCount = habit.days.filter(Boolean).length;
    const progress = Math.round((completedCount / 7) * 100);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-6 rounded-2xl w-full max-w-md relative overflow-hidden"
        >
            {/* Background Progress Bar */}
            <div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
            />

            <div className="flex justify-between items-start mb-6 mt-2">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        {habit.title}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                        {completedCount} / 7 days completed
                    </p>
                </div>
                <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono">
                    {progress}%
                </div>
            </div>

            <div className="flex justify-between gap-2">
                {habit.days.map((completed, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                        <span className="text-xs text-gray-500 font-medium">{DAYS[index]}</span>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onToggle(index)}
                            className={clsx(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border",
                                completed
                                    ? "bg-gradient-to-tr from-blue-600 to-cyan-500 border-transparent shadow-lg shadow-blue-500/25"
                                    : "bg-white/5 border-white/10 hover:border-white/20"
                            )}
                        >
                            {completed && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    <Check size={18} strokeWidth={3} className="text-white" />
                                </motion.div>
                            )}
                        </motion.button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
