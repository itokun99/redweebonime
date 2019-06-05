import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Homepage from '../containers/client/content/Homepage';
import RootWrapper from "../containers/client/RootWrapper";
import GlobalProvider, {GlobalConsumer} from "../context/context";
import RootRouter from './RootRouter';
import AdminWrapper from '../containers/admin/AdminWrapper';
import Login from '../containers/admin/content/Login';
import AddAnime from '../containers/admin/content/AnimePage';
import Dashboard from '../containers/admin/content/Dashboard';
import AnimeList from '../containers/admin/content/AnimeList';



// Komponen Navigation : komponen Navigasi Client Screen 
const Navigation = (props) => {
    return(
        <Switch>
            <Route path="/" component={RootWrapper(Homepage)} exact />
            {props.RootState.isLogin ?
                <>
                    <Route path="/admin" component={AdminWrapper(Dashboard)} exact />
                    <Route path="/admin/anime" component={AdminWrapper(AnimeList)} exact />
                    <Route path="/admin/anime/add" component={AdminWrapper(AddAnime)} exact />
                    <Route path="/admin/anime/edit/:id" component={AdminWrapper(AddAnime)} exact />
                </>
            :
            <>
                <Route path='/admin' component={Login} exact />
                <Route component={Login} exact />
            </>
            }
        </Switch>
    );
}

export default GlobalProvider(RootRouter(GlobalConsumer(Navigation)));