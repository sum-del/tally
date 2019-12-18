import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import My from "./components/my";
import ChangePerson from "./components/change_person";
import Changetel from "./components/changetel";
import ChangePwd from "./components/change_pwd";
import Feedback from "./components/feedback";
class users extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={'/users'}><My></My></Route>
                    <Route path={'/users/user/change_person/:name'} component={ChangePerson}></Route>
                    <Route path={'/users/user/changetel'}><Changetel></Changetel></Route>
                    <Route path={'/users/user/change_pwd'}><ChangePwd></ChangePwd></Route>
                    <Route path={'/users/feedback'}><Feedback></Feedback></Route>
                </Switch>
            </div>
        );
    }
}

export default users;