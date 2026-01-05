import { openDB, DBSchema } from 'idb';
import { Habit } from '@/types/habit';

interface HabitDB extends DBSchema {
    habits: {
        key: string;
        value: Habit;
    };
    syncQueue: {
        key: number;
        value: {
            id?: number;
            action: 'UPDATE_HABIT';
            payload: unknown;
            timestamp: number;
        };
        indexes: { 'by-timestamp': number };
    };
}

const DB_NAME = 'habit-tracker-db';
const DB_VERSION = 1;

export const defaultHabit: Habit = {
    id: '1',
    title: 'Pray Fajr',
    createdAt: 0,
    days: [false, false, false, false, false, false, false],
};

export const initDB = async () => {
    return openDB<HabitDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('habits')) {
                db.createObjectStore('habits', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('syncQueue')) {
                const queueStore = db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
                queueStore.createIndex('by-timestamp', 'timestamp');
            }
        },
    });
};

export const getHabitFromDB = async (id: string): Promise<Habit | undefined> => {
    const db = await initDB();
    return db.get('habits', id);
};

export const saveHabitToDB = async (habit: Habit) => {
    const db = await initDB();
    return db.put('habits', habit);
};

export const addToSyncQueue = async (action: 'UPDATE_HABIT', payload: unknown) => {
    const db = await initDB();
    await db.add('syncQueue', {
        action,
        payload,
        timestamp: Date.now(),
    });
};

export const getSyncQueue = async () => {
    const db = await initDB();
    return db.getAllFromIndex('syncQueue', 'by-timestamp');
};

export const clearSyncQueue = async () => {
    const db = await initDB();
    return db.clear('syncQueue');
};
