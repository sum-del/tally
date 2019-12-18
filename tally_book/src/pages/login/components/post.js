import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import ajax from "../../../func/axjs";
import {successToast,failToast,loadingToast} from '../../public/hint'
import {codes,code} from './code'
import  send from './send'
import './post.css'
import {msgbox, push} from "../../public/msgbox";
let {log:print} = console
class Post extends Component {
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
            nickname:''
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
    //注册方法
    register = ()=>{
        let data = {
            mobile: this.state.mobile,
            verify: this.state.verify,
            password : this.state.password,
            nickname : this.state.nickname
        }
        console.log(data)
        ajax('post','api/user/register',data,(result)=>{
            if(result.status){
                this.setState({
                    users:result.data
                })
                successToast('注册成功')
                setTimeout(()=>{push('/')},1000)
            }else{
                failToast(result.data)
                setTimeout(()=>{push('/login/post')},3000)
            }
        })
        console.log(this.state.users)
    }
    code = ()=>{
        code((res)=>{
            this.setState({code:res.data})
        })
    }
    //设置生命周期
    componentDidMount(){
        code((res)=>{
            this.setState({code:res.data})
        })
    }
    render() {
        return (
            <div className={'bgimg'}>
                <div className={'post'}>
                    <h2>欢迎注册</h2>
                    <div className={'input'}>
                        <span className={'contents'}>昵称:</span>
                        <div><input type="text" name={'nickname'} value={this.state.nickname} onChange={(r)=>{this.setState({nickname:r.target.value})}} /></div>
                    </div>
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
                        <button onClick={this.register}>立即注册</button>
                        <div className={'floor'}><Link to={'/'}>已有帐号,现在登录</Link></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;