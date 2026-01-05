export function useBadging() {
    const setBadge = async (count: number) => {
        // Check if the API is supported
        if ('setAppBadge' in navigator) {
            try {
                if (count > 0) {
                    // Cast to any because TS might not know about this API yet
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    await (navigator as any).setAppBadge(count);
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    await (navigator as any).clearAppBadge();
                }
            } catch (error) {
                console.error('Error setting app badge:', error);
            }
        }
    };

    const clearBadge = async () => {
        if ('clearAppBadge' in navigator) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await (navigator as any).clearAppBadge();
            } catch (error) {
                console.error('Error clearing app badge:', error);
            }
        }
    };

    return { setBadge, clearBadge };
}
