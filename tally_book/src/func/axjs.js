import axios from "axios";
import qs from 'qs';
import { createHashHistory } from 'history'
import {display, hidden} from "../pages/public/roll";
var ajax=function (method,url,data,cb,head= "application/x-www-form-urlencoded") {
    display()
    //判断content type 是什么类型,若是form-data 则不转换成字符串
    if(head!="multipart/form-data"){
        data = qs.stringify(data)
    }
    var token = '?token='+localStorage.getItem('token')
    //判断url 有无?
    let par = /\?.*\=/
    let res = par.test(url)
    if (res){
        token = '&token='+localStorage.getItem('token')
    }
    axios({
        method:method,
        url:'http://jizhang-api-dev.it266.com/'+url+token,
        headers:{
            "Content-Type":head
        },
        timeout: 10000,
        //上传文件不需要解析data,而普通需要解析变量
        data:data
    }).then((response)=>{
        if (response.data.status){
            hidden()
            cb(response.data)
        }else {
            if (response.data.data.code=='INVALID_TOKEN'){
                createHashHistory().push('/login/index')
            }
            hidden()
            cb(response.data)
        }
    }).catch((error)=>{
        console.log(error)
        if (error.code === 'ECONNABORTED'){
            hidden()
            document.getElementById('neterror').style.display = 'block'
        }
    })
    // setTimeout(hidden, 4000)
}




export  default ajax