import React from 'react'
import ajax from "../../../func/axjs";
let codes = (url,func)=>{
    return (<div className={'code'} onClick={func}><img src={url} alt="大侠手速太快请稍等"/></div>)
}
//获得图形验证码方法
let code= (state)=>{
    ajax('get','api/captcha','',(result)=>{
        state(result)
    })
}
export{codes,code}






