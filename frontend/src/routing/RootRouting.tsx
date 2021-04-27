import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Loadable from 'react-loadable';

const Homepage = Loadable({
    loader: () => import('../pages/Homepage/Homepage'),
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

const PlacePage = Loadable({
    loader: () => import('../pages/PlaceDetails/PlaceDetailsPage'),
    loading: () => null
})

const PlanDetail = Loadable({
    loader: () => import('../pages/PlanDetailsPage/PlanDetailsPage'),
    loading: () => null
})

const PlanSelection = Loadable({
    loader: () => import('../pages/PlanSelection/PlanSelectionPage'),
    loading: () => null
})

const Login = Loadable({
    loader: () => import('../pages/Login/LoginPage'),
    loading: () => null
})


const RootRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/collections" exact component={CollectionPage} />
            <Route path="/explore" exact component={ExplorePage} />
            <Route path="/setting" exact component={SettingPage} />
            <Route path="/place" component={PlacePage} />
            <Route path="/plan" component={PlanDetail} />
            <Route path='/planSelection' component={PlanSelection} />
            <Route path='/profile' component={Login} />
        </Switch>
    );
};

export default RootRoutes;