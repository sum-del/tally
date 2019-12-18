import React, {Component} from 'react';
import { createHashHistory } from 'history'
import page from "../../public/all";
import title from "../../public/title";
import inputs from "../../public/inputs";
import ajax from "../../../func/axjs";
import {msgbox, push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'
class Adduser extends Component {
    constructor(props) {
        super(props);
        this.id  = this.props.match.params.id
        this.mobile = React.createRef()
    }
    submit = ()=>{
        let data = {
            book_id : this.id,
            mobile: this.mobile.current.value
        }
        ajax('post','api/member/add',data,(res)=>{
            if (res.status){
                successToast('增加成功')
                setTimeout(()=>{push('/paper/user/'+this.id)},1000)
            }else{
                failToast(res.data)
            }
        })
    }
    div = ()=>{
        return(
            <div className={'txt'}>
                {inputs('手机号:','mobile',this.mobile)}
            </div>
        )
    }
    render() {
        return (
            <div>
                {page(title('/paper/user/'+this.id,'邀请成员','','提交',this.submit),this.div())}
            </div>
        );
    }
}

export default Adduser;