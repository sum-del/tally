import React, {Component} from 'react';
import page from "../../public/all";
import title from "../../public/title";
import {successToast,failToast,loadingToast} from '../../public/hint'
import './feedback.css'
import ajax from "../../../func/axjs";
import {msgbox, push} from "../../public/msgbox";
class Feedback extends Component {
    constructor(props) {
        super(props);
        this.contact = React.createRef()
        this.content = React.createRef()
    }
    submit = ()=>{
        let data = {
            content:this.content.current.value,
            contact:this.contact.current.value
        }
        console.log(data)
        ajax('post','api/feedback/add',data,(res)=>{
            if (res.status){
                successToast('提交成功')
                setTimeout(()=>{push('/users')},1000)
            }else{
                failToast(res.data)
            }
        })
    }
    div = ()=>{
        return(
            <div className={'txt'}>
                <div className={'textarea'}>
                    <textarea name="content" ref={this.content} placeholder={'请输入您想要反馈的内容'} autoFocus></textarea>
                </div>
                <div className={'input'}>
                    <span className={'contents'}>联系方式:</span>
                    <div><input type="txt" name={'contact'}  ref={this.contact} maxLength={11}/></div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                {page(title('/users','意见反馈','','提交',this.submit),this.div())}
            </div>
        );
    }
}

export default Feedback;