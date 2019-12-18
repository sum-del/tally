import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import MyTally from "./component";
import Addtally from "./component/addtally";
class Tally extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={'/tally'}><MyTally></MyTally></Route>
                    <Route path={'/tally/addtally/:id'} component={Addtally}></Route>
                </Switch>
            </div>
        );
    }
}

export default Tally;