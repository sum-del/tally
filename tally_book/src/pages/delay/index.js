import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import Index from "./component";
import Add from "./component/add";
class Delay extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={'/delay'} component={Index}></Route>
                    <Route path={'/delay/add/:id'} component={Add}></Route>
                </Switch>
            </div>
        );
    }
}

export default Delay;