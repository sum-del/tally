import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './login.css'
import {codes,code} from './code'
import ajax from "../../../func/axjs";
import {msgbox, push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'

let {log:print} = console;
class Login extends Component {
    constructor(props){
        super(props)
        this.state ={
            token:'',
            users:'',
            code:'',
            mobile:'',
            captcha_code:'',
            captcha_key:'',
            password:'',
        }
    }
    //设置生命周期
    componentDidMount(){
        code((res)=>{
            this.setState({
                code : res.data,
                captcha_key:res.data.key,
            })
            // console.log(res)
        })
    }
    //再次执行code
    code = ()=>{
        console.log('hi')
        code((res)=>{
            this.setState({
                code : res.data,
                captcha_key:res.data.key,
            })
        })
    }
    //登录
    login = ()=>{
        let data = {
            mobile   :this.state.mobile,
            password  :this.state.password,
            captcha_code:this.state.captcha_code,
            captcha_key:this.state.captcha_key
        }
        ajax('post','api/user/token/mobile',data,(result)=>{
            if (result.status){
                localStorage.setItem('token',result.data.token)
                successToast('登录成功')
                setTimeout(()=>{push('/users')},1000)
            }else{
                failToast(result.data)
            }
        })
    }
    render() {
        return (
            <div  className={'bgimg'} >
                <div className={'login'} >
                    <h2>欢迎登陆</h2>
                    <div className={'input'}>
                        <span className={'contents'}>手机号:</span>
                        <div><input type="text" maxLength={'11'} name={'mobile'} value={this.state.mobile} onChange={(r)=>{this.setState({mobile:r.target.value})}}/></div>
                    </div>
                    <div className={'input'} >
                        <span className={'contents'}>验证码:</span>
                        <div><input type="text" name={'captcha_code'} value={this.state.captcha_code} onChange={(r)=>{this.setState({captcha_code:r.target.value})}}/></div>
                        {codes(this.state.code.url,this.code)}
                    </div>
                    <div className={'input'}>
                        <span className={'contents'}>密码:</span>
                        <div><input type="password" name={'password'} value={this.state.password} onChange={(r)=>{this.setState({password:r.target.value})}} /></div>
                    </div>
                    <div className={'check'}>
                        <button onClick={this.login}>登录</button>
                        <Link to={'/login/post'}><button>注册</button></Link>
                    </div>
                    <Link to={'/login/newpwd'}><div className={'forget'}>忘记密码?</div></Link>
                </div>
            </div>
        );
    }
}
export default Login;