import { APIContext } from 'contexts/api';

type APIProviderProps = {
    children: React.ReactNode;
};

const APIProvider: React.FC<APIProviderProps> = ({ children }) => {
    return <APIContext.Provider value={{}}>{children}</APIContext.Provider>;
};

export default APIProvider;
