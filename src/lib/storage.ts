import { Habit } from "@/types/habit";

export const defaultHabit = {
  id: '1',
  title: 'صلاة الفجر',
  createdAt: 0,
  days: [false, false, false, false, false, false, false],
};

// const KEY = 'habit::1';

export function getHabit(): Habit {
  const stored = localStorage.getItem("habit");
  if (stored) return JSON.parse(stored);
  const defaultHabit = {
    id: "default",
    title: "اقرأ قرآن",
    createdAt: Date.now(),
    days: [false, false, false, false, false, false, false],
  };
  localStorage.setItem("habit", JSON.stringify(defaultHabit));
  return defaultHabit;
}

export function toggleDay(dayIndex: number): Habit {
  const habit = getHabit();
  habit.days[dayIndex] = !habit.days[dayIndex];
  localStorage.setItem("habit", JSON.stringify(habit));
  return habit;
}

