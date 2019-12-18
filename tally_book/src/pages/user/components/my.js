import React, {Component} from 'react';
import ajax from "../../../func/axjs";
import { createHashHistory } from 'history'
import {Link} from  'react-router-dom'
import bottom from "../../public/bottom";
import './my.css'
import {msgbox, push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'
class My extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            user: {nickname:''},
            page: [
                {icon1:'\ue620',text1:'我的账户',path:'/account',icon2:'\ue609'},
                {icon1:'\ue61f',text1:'我的帐蒲',path:'/paper',icon2:'\ue609'},
                {icon1:'\ue634',text1:'意见反馈',path:'/users/feedback',icon2:'\ue609'}
            ],
            page2:[
                {icon1:'\ue610',text1:'修改手机号',path:'/users/user/changetel',icon2:'\ue609'},
                {icon1:'\ue624',text1:'修改密码',path:'/users/user/change_pwd',icon2:'\ue609'}
            ],
            page3:[{icon1:'\ue674',text1:'退出登录',path:'',icon2:'\ue609'}]
        }
    }
    //获得用户信息
    usermsg = ()=>{
        ajax('get','api/user/profile','',(res)=>{
            if (res.status){
                this.setState({user:res.data})
            }else{
                createHashHistory().push('/login/index')
            }
        })
    }
    //黑色空格
    black = ()=>{
        return(<div className={'b_space'}></div>)
    }
    //模块页面
    line = (a,b,c,d,res)=>{
        return (
            <Link to={c} key={res}>
                <div className={'line'} >
                    <div className={'line_l'}>
                        <span className={'iconfont icon1'}>{a}</span>
                        <span className={'t1'}>{b}</span>
                    </div>
                    <div className={'line_r'}>
                        <span className={'iconfont icon2'}>{d}</span>
                    </div>
                </div>
            </Link>
        )
    }
    //退出
    exit = ()=>{
        ajax('get','api/user/logout','',(res)=>{
            if (res.status){
                successToast('退出成功')
                push('/')
            }
        })
    }
    push = ()=>{
        createHashHistory().push('/up')
    }
    componentDidMount() {
        this.usermsg()
    }
    render() {
        return (
            <div className={'person_center'}>
               <div className={'head'}>
                   {/*<Link to={'/login/index'}><div className={'login'}>登录账号,开始记账</div></Link>*/}
                   <div className={'avatar'} onClick={this.push}><img src={this.state.user.avatar_url} /></div>
                   <div className={'username'}>
                       {this.state.user.nickname}
                   </div>
               </div>
                <div className={'body'}>
                    <ul className={'record'}>
                        <li>
                            <div className={'num1'}>0</div>
                            <div className={'text'}>已邀请</div>
                        </li>
                        <li>
                            <div className={'num2'}>0</div>
                            <div className={'text'}>总帐本</div>
                        </li>
                        <li>
                            <div className={'num3'}>0</div>
                            <div className={'text'}>共记账</div>
                        </li>
                    </ul>
                    {this.black()}
                    {
                        this.state.page.map((res)=>{
                            return this.line(res.icon1,res.text1,res.path,res.icon2,res)
                        })
                    }
                    {this.black()}
                    {
                        this.state.page2.map((res)=>{
                            return this.line(res.icon1,res.text1,res.path,res.icon2,res)
                        })
                    }
                    <Link to={'/users/user/change_person/'+this.state.user.nickname} >
                        <div className={'line'} >
                            <div className={'line_l'}>
                                <span className={'iconfont icon1'}>{'\ue6ff'}</span>
                                <span className={'t1'}>修改资料</span>
                            </div>
                            <div className={'line_r'}>
                                <span className={'iconfont icon2'}>{'\ue609'}</span>
                            </div>
                        </div>
                    </Link>
                    {this.black()}
                    <div onClick={()=>this.exit()}>
                    {
                        this.state.page3.map((res)=>{
                            return this.line(res.icon1,res.text1,res.path,res.icon2,res)
                        })
                    }
                    </div>
                    {this.black()}
                </div>
                {bottom('','','','','fc')}
            </div>
        );
    }
}

export default My;