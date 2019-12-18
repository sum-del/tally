import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import MyDetail from "./component";
import Gb from "./component/GB";
import Edit from "./component/edit";
import Accounts from "./component/accounts";
import Editgb from "./component/editgb";
class Detail extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path={'/detail'} exact><MyDetail></MyDetail></Route>
                    <Route path={'/detail/Gb/:id'} component={Gb}></Route>
                    <Route path={'/detail/edit/:id'} component={Edit}></Route>
                    <Route path={'/detail/accounts/:id'} component={Accounts}></Route>
                    <Route path={'/detail/editgb/:id/:aid'} component={Editgb}></Route>
                </Switch>
            </div>
        );
    }
}

export default Detail;