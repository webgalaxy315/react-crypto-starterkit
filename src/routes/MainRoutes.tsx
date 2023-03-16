import { lazy } from 'react';

// Bounding Import
import Layout from 'layouts';
import Loadable from 'components/Loadable';

const IndexPage = Loadable(lazy(() => import('pages')));

const MainRoutes = {
    path: '/',
    element: <Layout />,
    children: [
        {
            index: true,
            element: <IndexPage />
        }
    ]
};

export default MainRoutes;
