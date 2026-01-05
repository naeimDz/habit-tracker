'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudOff, RefreshCw, Bell, Share2 } from 'lucide-react';
import { Habit } from '@/types/habit';
import { getHabitFromDB, saveHabitToDB, addToSyncQueue, defaultHabit } from '@/lib/db';
import { useSync } from '@/hooks/useSync';
import { useBadging } from '@/hooks/useBadging';
import HabitCard from './HabitCard';
import InstallPrompt from './InstallPrompt';

export default function HabitTracker() {
    const [habit, setHabit] = useState<Habit | null>(null);
    const { isOnline, isSyncing } = useSync();
    const { setBadge } = useBadging();

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getHabitFromDB('1');
                if (data) {
                    setHabit(data);
                    const remaining = data.days.filter(d => !d).length;
                    setBadge(remaining);
                } else {
                    await saveHabitToDB(defaultHabit);
                    setHabit(defaultHabit);
                    const remaining = defaultHabit.days.filter(d => !d).length;
                    setBadge(remaining);
                }
            } catch (error) {
                console.error("Failed to load habit data:", error);
            }
        };
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateBadge = (currentHabit: Habit) => {
        const remaining = currentHabit.days.filter(d => !d).length;
        setBadge(remaining);
    };

    const handleToggle = async (dayIndex: number) => {
        if (!habit) return;

        const newDays = [...habit.days];
        newDays[dayIndex] = !newDays[dayIndex];

        const updatedHabit = { ...habit, days: newDays };
        setHabit(updatedHabit);
        updateBadge(updatedHabit); // Update badge on toggle

        // Save locally
        await saveHabitToDB(updatedHabit);

        // Queue sync action
        await addToSyncQueue('UPDATE_HABIT', { id: habit.id, dayIndex, status: newDays[dayIndex] });
    };

    const handleNotificationTest = () => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
            return;
        }

        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification("Great job!", {
                    body: "You checked off a habit today. Keep it up!",
                    icon: "/icons/icon1.png"
                });
            }
        });
    };

    const handleShare = async () => {
        if (!habit) return;

        const completedCount = habit.days.filter(Boolean).length;
        const text = `I've completed ${completedCount}/7 days of my habit "${habit.title}"! 🚀 track yours with HabitFlow.`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'HabitFlow Progress',
                    text: text,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback for desktop/unsupported browsers
            navigator.clipboard.writeText(text);
            alert('Progress copied to clipboard!');
        }
    };

    if (!habit) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">

            {/* Network Status Indicator */}
            <motion.div
                className="fixed top-4 right-4 glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium z-10"
                animate={{
                    backgroundColor: !isOnline ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: !isOnline ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.1)'
                }}
            >
                {isSyncing ? (
                    <>
                        <RefreshCw size={16} className="animate-spin text-yellow-400" />
                        <span className="text-yellow-100">Syncing...</span>
                    </>
                ) : !isOnline ? (
                    <>
                        <CloudOff size={16} className="text-red-400" />
                        <span className="text-red-100">Offline</span>
                    </>
                ) : (
                    <>
                        <Cloud size={16} className="text-green-400" />
                        <span className="text-green-100">Synced</span>
                    </>
                )}
            </motion.div>

            <div className="z-10 w-full max-w-md flex flex-col items-center gap-8">

                {/* Header */}
                <div className="text-center space-y-2">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                    >
                        HabitFlow
                    </motion.h1>
                    <p className="text-gray-400 text-sm">Build consistency, one day at a time.</p>
                </div>

                {/* Main Card */}
                <HabitCard habit={habit} onToggle={handleToggle} />

                {/* Action Buttons Row */}
                <div className="flex gap-4">
                    {/* Notification Test */}
                    <motion.button
                        onClick={handleNotificationTest}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-xs text-blue-300/80 hover:text-blue-300 px-4 py-2 hover:bg-white/5 rounded-full transition-colors glass-button"
                    >
                        <Bell size={14} />
                        <span>Test Alert</span>
                    </motion.button>

                    {/* Share Button (New) */}
                    <motion.button
                        onClick={handleShare}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-xs text-pink-300/80 hover:text-pink-300 px-4 py-2 hover:bg-white/5 rounded-full transition-colors glass-button"
                    >
                        <Share2 size={14} />
                        <span>Share Streak</span>
                    </motion.button>
                </div>

            </div>

            <InstallPrompt />
        </div>
    );
}
