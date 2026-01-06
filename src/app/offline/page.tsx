'use client';
import { CloudOff } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function OfflinePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-8 rounded-2xl max-w-sm w-full flex flex-col items-center gap-6"
            >
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
                    <CloudOff size={40} className="text-red-400" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold mb-2">You are Offline</h1>
                    <p className="text-gray-400">
                        It seems you lost your internet connection.
                        Don't worry, HabitFlow still works offline!
                    </p>
                </div>

                <Link
                    href="/"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                >
                    Try to Reload
                </Link>
            </motion.div>
        </div>
    );
}
