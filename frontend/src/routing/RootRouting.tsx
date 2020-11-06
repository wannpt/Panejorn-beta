import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const Homepage = Loadable({
    loader: () => import('../pages/Homepage'),
    loading: () => null
});

const RootRoutes = () => {
    
}

export default RootRoutes;