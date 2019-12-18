import ajax from "../../../func/axjs";
import {msgbox, push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'
//封装的发送短信方法
function send(data)
{
    // console.log(data)
    ajax('post','api/sms/verify',data,(result)=>{
        if(result.status){
            successToast(result.data)
        }else{
            if (result.data=='INVALID_CAPTCHA'){
                successToast('图形验证码无效')
                window.location.reload()
            }else{
                failToast(result.data)
                window.location.reload()
            }
        }
    })
}
export default send