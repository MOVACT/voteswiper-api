import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './contexts/app';

createInertiaApp({
    title: (title) => `${title} - VoteSwiper | WahlSwiper`,
    resolve: async (name) => {
        const page = await resolvePageComponent<{ default: InertiaPage }>(
            // Folder pages (e.g. "countries") live in pages/countries/index.tsx.
            [`./pages/${name}.tsx`, `./pages/${name}/index.tsx`],
            import.meta.glob<{ default: InertiaPage }>('./pages/**/*.tsx')
        );
        return page.default;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <AppProvider>
                <App {...props} />
            </AppProvider>
        );
    },
    progress: {
        showSpinner: true,
    },
});
