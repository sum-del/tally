import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import Post from "./components/post";
import Login from "./components";
import Newpwd from "./components/newpwd";
import My from "../user/components/my";
class Logins extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={'/'}><Login></Login></Route>
                    <Route  path={'/login/post'}><Post></Post></Route>
                    <Route exact  path={'/login/newpwd'}><Newpwd></Newpwd></Route>
                </Switch>
            </div>
        );
    }
}

export default Logins;