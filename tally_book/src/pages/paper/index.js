import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import Index from "./component";
import Insert from "./component/insert";
import Detail from "./component/detail";
import Edit from "./component/edit";
import User from "./component/paperuser";
import Adduser from "./component/adduser";
import './component/paper.css'
class Paper extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={'/paper'}><Index></Index></Route>
                    <Route path={'/paper/insert'}><Insert></Insert></Route>
                    <Route path={'/paper/detail/:id'} component={Detail}></Route>
                    <Route path={'/paper/edit/:id'} component={Edit}></Route>
                    <Route path={'/paper/user/:id'} component={User}></Route>
                    <Route path={'/paper/adduser/:id'} component={Adduser}></Route>
                </Switch>
            </div>
        );
    }
}

export default Paper;