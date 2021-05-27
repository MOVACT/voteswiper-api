/* eslint-disable @typescript-eslint/no-var-requires */
import { InertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import React from 'react';
import { render } from 'react-dom';
import { Helmet } from 'react-helmet';
import { AppProvider } from './contexts/app';

InertiaProgress.init({
    includeCSS: true,
});

const el = document.getElementById('app');

const App: React.FC = () => {
    return (
        <AppProvider>
            <Helmet titleTemplate="%s - VoteSwiper | WahlSwiper" />
            {el && (
                <InertiaApp
                    initialPage={JSON.parse(el.dataset.page as string)}
                    resolveComponent={(name) =>
                        require(`./pages/${name}`).default
                    }
                />
            )}
        </AppProvider>
    );
};

render(<App />, el);
