import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './change_person.css'
import ajax from "../../../func/axjs";
import title from "../../public/title";
import {successToast,failToast,loadingToast} from '../../public/hint'
import {msgbox, push} from "../../public/msgbox";
class ChangePwd extends Component {
    constructor(props){
        super(props)
        //初始化数据
        this.state ={
            password:'',
            new_password:''
        }
    }
    update = ()=>{
        ajax('post','api/user/password',this.state,(res)=>{
            if (res.status){
                successToast('修改成功')
                setTimeout(()=>{push('/users')},1000)
            }else{
                failToast(res.data)
            }
        })
    }
    render() {
        return (
            <div className={'addtype'}>
                {title('/users','修改密码','','保存',this.update)}
                <div className={'body'} >
                    <div className={'txt'}>
                        <div className={'input'}>
                            <span className={'contents'}>密码:</span>
                            <div><input type="password" name={'password'} value={this.state.password} onChange={(r)=>{this.setState({password:r.target.value})}} /></div>
                        </div>
                        <div className={'input'}>
                            <span className={'contents'}>新密码:</span>
                            <div><input type="password" name={'new_password '} value={this.state.new_password} onChange={(r)=>{this.setState({new_password:r.target.value})}} /></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePwd;