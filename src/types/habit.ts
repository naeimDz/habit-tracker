// types/habit.ts
export type Habit = {
  id: string;
  title: string;
  description?: string;
  createdAt: number;
  days: boolean[]; // [false, true, false, ..., length = 7]
}
