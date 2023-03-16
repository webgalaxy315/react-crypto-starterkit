import { useContext } from 'react';

import { StoreContext } from 'contexts/store';

// ==============================|| CONFIG - HOOKS  ||============================== //

const useStore = () => useContext(StoreContext);

export default useStore;
