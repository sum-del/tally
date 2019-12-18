import React, {Component} from 'react';
import {code, codes} from "../../login/components/code";
import send from "../../login/components/send";
import './changetel.css'
import ajax from "../../../func/axjs";
import title from "../../public/title";
import {msgbox, push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'
class Changetel extends Component {
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
        ajax('post','api/user/mobile',data,(res)=>{
            if (res.status){
                successToast('修改成功')
                setTimeout(()=>{push('/users')},1000)
            }else{
                failToast(res.data)
            }
        })
    }
    //挂载完成触发
    componentDidMount(){
        let res
        code((res)=>{
            this.setState({
                code : res.data,
                captcha_key:res.data.key,
            })
        })
    }
    render(){
        return (
            <div className={'addtype changetel'}>
                {title('/users','修改手机号','','保存',this.update)}
                <div className={'body'} >
                    <div className={'txt'}>
                        <div className={'input'} >
                            <span className={'contents'}>验证码:</span>
                            <div><input type="text" name={'captcha_code'}  placeholder={'请输入验证码'} onChange={(r)=>{this.setState({captcha_code:r.target.value})}}/></div>
                            {codes(this.state.code.url)}
                        </div>
                        <div className={'input'}>
                            <span className={'contents'}>手机号:</span>
                            <div><input type="text" maxLength={'11'} name={'mobile'} placeholder={'输入手机号'}  onChange={(r)=>{this.setState({mobile:r.target.value})}}/></div>
                            <div className={'send'} onClick={()=>send(this.data())}>发送验证码</div>
                        </div>
                        <div className={'input'}>
                            <span className={'contents'}>手机码:</span>
                            <div><input type="text" name={'verify'} placeholder={'输入手机验证码'}  onChange={(r)=>{this.setState({verify:r.target.value})}}/></div>
                        </div>
                        <div className={'input'}>
                            <span className={'contents'}>密码:</span>
                            <div><input type="password" name={'password'} placeholder={'输入密码'}  onChange={(r)=>{this.setState({password:r.target.value})}} /></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Changetel;