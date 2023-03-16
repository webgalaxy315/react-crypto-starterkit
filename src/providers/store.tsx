import { StoreContext } from 'contexts/store';

type StoreProviderProps = {
    children: React.ReactNode;
};

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
    return (
        <StoreContext.Provider value={{}}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
