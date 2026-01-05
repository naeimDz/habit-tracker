import { useEffect, useState } from 'react';
import { getSyncQueue, clearSyncQueue } from '@/lib/db';

export function useSync() {
    const [isOnline, setIsOnline] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        // Initial check
        setIsOnline(navigator.onLine);

        const handleOnline = () => {
            setIsOnline(true);
            processSyncQueue();
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const processSyncQueue = async () => {
        if (!navigator.onLine) return;

        setIsSyncing(true);
        try {
            const queue = await getSyncQueue();
            if (queue.length > 0) {
                console.log('🔄 Processing Sync Queue:', queue);

                // Simulation of sending data to a backend server
                // In a real app, you would loop through queue and POST to API
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Fake network delay

                console.log('✅ Sync Completed');
                await clearSyncQueue();
            }
        } catch (error) {
            console.error('❌ Sync Failed:', error);
        } finally {
            setIsSyncing(false);
        }
    };

    return { isOnline, isSyncing, processSyncQueue };
}
