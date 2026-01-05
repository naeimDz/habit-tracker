# HabitFlow - Daily Habit Tracker

## English

HabitFlow is a modern Progressive Web App (PWA) designed to help you build and maintain daily habits. It's an offline-first application, leveraging IndexedDB for local storage and a simulated sync queue for background data synchronization.

### Key Features:
- **Offline-First:** Track your habits even without an internet connection.
- **Optimistic UI Updates:** Experience instant feedback with optimistic UI updates.
- **Background Sync:** Data is seamlessly synchronized in the background when online.
- **App Badging:** Get visual reminders with app badge counts for incomplete habits.
- **Notifications:** Receive motivational notifications.
- **Installable PWA:** Install HabitFlow directly to your device for a native app experience.

### Architecture Highlights:
- **Framework:** Next.js 15 (App Router) with TypeScript.
- **State Management & Persistence:** Habit state is managed client-side and persisted in IndexedDB (`src/lib/db.ts`).
- **Sync Mechanism:** Updates are queued (`addToSyncQueue`) and processed by `useSync.processSyncQueue()` for simulated backend synchronization.
- **UI Components:** Built using React client components (e.g., `src/components/HabitTracker.tsx`, `src/components/HabitCard.tsx`) with `"use client"` directive.

### Getting Started

#### Development (Service Worker disabled):
```bash
npm install
npm run dev
```

#### Production Build (Service Worker active - for PWA testing):
```bash
npm install
npm run build
npm run start
```

---

## العربية

HabitFlow هو تطبيق ويب تقدمي (PWA) حديث مصمم لمساعدتك في بناء عادات يومية والحفاظ عليها. إنه تطبيق يعتمد على مبدأ "عدم الاتصال أولاً" (offline-first)، ويستفيد من IndexedDB للتخزين المحلي وقائمة انتظار مزامنة محاكاة لمزامنة البيانات في الخلفية.

### الميزات الرئيسية:
- **يعمل دون اتصال بالإنترنت:** تتبع عاداتك حتى بدون اتصال بالإنترنت.
- **تحديثات واجهة المستخدم المتفائلة:** استمتع بتعليقات فورية مع تحديثات واجهة المستخدم المتفائلة.
- **المزامنة في الخلفية:** تتم مزامنة البيانات بسلاسة في الخلفية عند الاتصال بالإنترنت.
- **شارة التطبيق (App Badging):** احصل على تذكيرات مرئية مع عدد الشارات للتطبيقات غير المكتملة.
- **الإشعارات:** تلقي إشعارات تحفيزية.
- **تطبيق PWA قابل للتثبيت:** قم بتثبيت HabitFlow مباشرة على جهازك لتجربة تطبيق أصلي.

### أبرز ملامح البنية:
- **الإطار (Framework):** Next.js 15 (App Router) مع TypeScript.
- **إدارة الحالة والمثابرة:** تتم إدارة حالة العادات على جانب العميل وتخزينها في IndexedDB (`src/lib/db.ts`).
- **آلية المزامنة:** يتم وضع التحديثات في قائمة الانتظار (`addToSyncQueue`) ومعالجتها بواسطة `useSync.processSyncQueue()` لمزامنة الواجهة الخلفية المحاكاة.
- **مكونات واجهة المستخدم:** مبنية باستخدام مكونات React من جانب العميل (على سبيل المثال، `src/components/HabitTracker.tsx`، `src/components/HabitCard.tsx`) مع توجيه `"use client"`.

### البدء

#### التطوير (Service Worker معطل):
```bash
npm install
npm run dev
```

#### إصدار الإنتاج (Service Worker نشط - لاختبار PWA):
```bash
npm install
npm run build
npm run start
```
