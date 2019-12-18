import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import Show from "./component";
import Add from './component/add.js'
import Edit from "./component/edit";
class InOut extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={'/inout'}><Show></Show></Route>
                    <Route path={'/inout/add'}><Add></Add></Route>
                    <Route path={'/inout/edit/:type/:id'} component={Edit}></Route>
                </Switch>
            </div>
        );
    }
}

export default InOut;