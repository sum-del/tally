import React, {Component} from 'react';
import './change_person.css'
import ajax from "../../../func/axjs";
import title from "../../public/title";
import {msgbox,push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'
//修改个人信息,并上传头像
class ChangePerson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname:this.props.match.params.name,
        }
    }
    up = ()=>{
        ajax('post','api/user/profile/update',this.state,(res)=>{
            if(res.status){
                successToast('修改成功')
                setTimeout(()=>{push('/users')},1000)
            }else{
                alert(res.data)
            }
        })
    }
    render() {
        return(
            <div className={'addtype upimg'}>
                {title('/users','修改资料','','保存',this.up)}
                <div className={'body'} >
                    <div className={'txt'}>
                        <div className={'input'}>
                            <span className={'contents'}>昵称:</span>
                            <input type="text" name={'nickname'} value={this.state.nickname} onChange={(e)=>{this.setState({nickname:e.target.value})}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePerson;