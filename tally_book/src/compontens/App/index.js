import React, {Component} from 'react';
import {HashRouter,Switch,Route} from 'react-router-dom'
import './m.css'
import 'antd-mobile/dist/antd-mobile.css'
import { createHashHistory } from 'history'
import Logins from "../../pages/login";
import Users from '../../pages/user'
import Account from "../../pages/account";
import InOut from "../../pages/in_out";
import Tally from "../../pages/tally";
import Detail from "../../pages/detail";
import Paper from "../../pages/paper";
import Delay from "../../pages/delay";
import ajax from "../../func/axjs";
import Upimg from "../../pages/public/upimg";
class App extends Component {
    // componentDidMount() {
    //     ajax('get','api/user/profile','',(res)=>{
    //         if (res.status){
    //             createHashHistory().push('/users/user/my')
    //         }else{
    //             createHashHistory().push('/')
    //         }
    //     })
    // }
    change = ()=>{
        document.getElementById('neterror').style.display='none'
        window.location.reload()
    }
    render() {
        return (
            <HashRouter>
                <div>
                    {/*转圈圈*/}
                    <div id={'zqq'} >
                        <div className={'zqq'}>
                            <i className="fa fa-spinner fa-pulse " ></i>
                        </div>
                    </div>
                    {/*网络断开展示*/}
                    <div id={'neterror'}>
                        <div className={'center'} onClick={this.change}>
                            <div className={'iconfont icon'}>&#xe67d;</div>
                            网络似乎开小差了,点击重试一下
                        </div>
                    </div>
                    <Switch>
                        <Route exact path={'/'} ><Logins></Logins></Route>
                        <Route path={'/login'}><Logins></Logins></Route>
                        <Route path={'/users'}><Users></Users></Route>
                        <Route path={'/account'}><Account></Account></Route>
                        <Route path={'/detail'}><Detail></Detail></Route>
                        <Route path={'/inout'}><InOut></InOut></Route>
                        <Route path={'/tally'}><Tally></Tally></Route>
                        <Route  path={'/paper'}><Paper></Paper></Route>
                        <Route path={'/delay'}><Delay></Delay></Route>
                        <Route path={'/up'}><Upimg></Upimg></Route>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}
export default App;