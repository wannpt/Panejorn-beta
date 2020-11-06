import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

const Homepage = Loadable({
    loader: () => import('../pages/Homepage'),
    loading: () => null
});

const CollectionPage = Loadable({
    loader: () => import('../pages/PlansCollection/CollectionPage'),
    loading: () => null
});

const RootRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/collections" exact component={CollectionPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default RootRoutes;