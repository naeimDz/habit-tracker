import HabitTracker from '@/components/HabitTracker';

export const dynamic = 'force-static';

export const metadata = {
  title: 'HabitFlow',
  description: 'A modern PWA habit tracker',
};

export default function Page() {
  return <HabitTracker />;
}
