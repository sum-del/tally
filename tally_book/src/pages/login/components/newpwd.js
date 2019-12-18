import React, {Component} from 'react';
import ajax from "../../../func/axjs";
import {codes,code} from "./code";
import send from './send'
import {successToast,failToast,loadingToast} from '../../public/hint'
import './newpwd.css'
import {Link} from "react-router-dom";
import {msgbox, push} from "../../public/msgbox";
class Newpwd extends Component {
    constructor(props){
        super(props)
        //初始化数据
        this.state ={
            users:'',
            code:'',
            mobile:'',
            captcha_code:'',
            captcha_key:'',
            verify:'',
            password:'',
        }
    }
    //完善发送短信所需数据
    data = ()=>{
        return(
            {
                mobile:this.state.mobile,
                captcha_code:this.state.captcha_code,
                captcha_key:this.state.code.key
            }
        )
    }
    //确认修改
    update = ()=>{
        let data ={
            mobile :this.state.mobile,
            password :this.state.password,
            verify :this.state.verify
        }
        ajax('post','api/user/token/sms',data,(res)=>{
            if (res.status){
                localStorage.setItem('token',res.data.token)
                successToast('修改成功')
                setTimeout(()=>{push('/')},1000)
            }else{
                failToast(res.data)
            }
        })
    }
    code = ()=>{
        code((res)=>{
            this.setState({
                code : res.data,
                captcha_key:res.data.key,
            })
        })
    }
    //挂载完成触发
    componentDidMount(){
        code((res)=>{
            this.setState({
                code : res.data,
                captcha_key:res.data.key,
            })
        })
    }
    render() {
        return (
            <div className={'bgimg'}>
                <div className={'newpwd'}>
                    <h2>重置密码</h2>
                    <div className={'input'} >
                        <span className={'contents'}>验证码:</span>
                        <div><input type="text" name={'captcha_code'} value={this.state.captcha_code} onChange={(r)=>{this.setState({captcha_code:r.target.value})}}/></div>
                        {codes(this.state.code.url,this.code)}
                    </div>
                    <div className={'input'}>
                        <span className={'contents'}>手机号:</span>
                        <div><input type="text" maxLength={'11'} name={'mobile'} value={this.state.mobile} onChange={(r)=>{this.setState({mobile:r.target.value})}}/></div>
                        <div className={'send'} onClick={()=>send(this.data())}>发送验证码</div>
                    </div>
                    <div className={'input'}>
                        <span className={'contents'}>手机码:</span>
                        <div><input type="text" name={'verify'} value={this.state.verify} onChange={(r)=>{this.setState({verify:r.target.value})}}/></div>
                    </div>
                    <div className={'input'}>
                        <span className={'contents'}>密码:</span>
                        <div><input type="password" name={'password'} value={this.state.password} onChange={(r)=>{this.setState({password:r.target.value})}} /></div>
                    </div>
                    <div className={'submit'}>
                        <button onClick={this.update}>确认修改</button>
                    </div>
                    <Link to={'/'}><div className={'forget'}>返回登陆</div></Link>
                </div>
            </div>
        );
    }
}

export default Newpwd;