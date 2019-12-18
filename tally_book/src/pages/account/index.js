import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import AddAccount from "./component/add_account";
import EditAccount from "./component/edit_account";
import Detail from "./component/detail";
import MyAccount from "./component/my_account";
class Account extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact  path={'/account'}><MyAccount></MyAccount></Route>
                    <Route path={'/account/add_account'}><AddAccount></AddAccount></Route>
                    <Route path={'/account/edit_account/:id'} component={EditAccount}></Route>
                    <Route path={'/account/detail/:id'} component={Detail}></Route>
                </Switch>
            </div>
        );
    }
}

export default Account;