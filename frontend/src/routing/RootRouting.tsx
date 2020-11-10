import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Loadable from 'react-loadable';

const Homepage = Loadable({
    loader: () => import('../pages/Homepage'),
    loading: () => null
});

const CollectionPage = Loadable({
    loader: () => import('../pages/PlansCollection/CollectionPage'),
    loading: () => null
});

const ExplorePage = Loadable({
    loader: () => import('../pages/ExplorePage'),
    loading: () => null
});

const SettingPage = Loadable({
    loader: () => import('../pages/SettingPage/MainSettingPage'),
    loading: () => null
});


const RootRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/collections" exact component={CollectionPage} />
            <Route path="/explore" exact component={ExplorePage} />
            <Route path="/setting" exact component={SettingPage} />
        </Switch>
    );
};

export default RootRoutes;