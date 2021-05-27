import React from 'react';
import { useLocalStorage } from 'react-use';

interface AppContext {
    drawerOpen: boolean | undefined;
    setDrawerOpen: (drawerOpen: boolean) => void;
}

const AppContext = React.createContext({} as AppContext);

const AppProvider: React.FC = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useLocalStorage<
        AppContext['drawerOpen']
    >('admin:drawer', false);

    return (
        <AppContext.Provider value={{ drawerOpen, setDrawerOpen }}>
            {children}
        </AppContext.Provider>
    );
};

const useApp = (): AppContext => React.useContext(AppContext);

export { AppProvider, useApp };
