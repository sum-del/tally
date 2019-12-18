import React, {Component} from 'react';
import { createHashHistory } from 'history'
import './add_account.css'
import ajax from "../../../func/axjs";
import title from "../../public/title";
import {msgbox, push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'
class EditAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    //获得这个id的信息
    getuser  = ()=>{
        ajax('get','api/account/detail?id='+this.props.match.params.id,'',(res)=>{
            if (res.status){
                this.setState(res.data)
            }
        })
    }
    //提交修改后的数据
    submit = ()=>{
        ajax('post','api/account/update?id='+this.props.match.params.id,this.state,(res)=>{
            if (res.status){
                successToast('修改成功')
                setTimeout(()=>{push('/account')},1000)
            }else{
                alert(res.data)
            }
        })
    }
    componentDidMount() {
        this.getuser()
    }
    render() {
        return(
            <div className={'addtype'}>
                <div className={'head'}>
                    {title('/account','修改账户','','保存',this.submit)}
                </div>
                <div className={'body'} >
                    <div className={'txt'}>
                        <div className={'input'}>
                            <span className={'contents'}>账户名</span>
                            <div><input type='text' name={'name'} value={this.state.name} onChange={(r)=>this.setState({name:r.target.value})} /></div>
                        </div>
                        <div className={'input'} >
                            <span className={'contents'}>类型:</span>
                            <select className={'select'} name="type" ref={this.type} value={this.state.type} onChange={(r)=>this.setState({type:r.target.value})} >
                                <option value="1">现金</option>
                                <option value="2">银行</option>
                                <option value="3">支付平台</option>
                                <option value="4">其他</option>
                            </select>
                        </div>
                        <div className={'input'}>
                            <span className={'contents'}>余额</span>
                            <div><input type='text' name={'initial_balance'} value={this.state.initial_balance} onChange={(r)=>{this.setState({initial_balance:r.target.value})}} /></div>
                        </div>
                        <div className={'input'}>
                            <span className={'contents'}>备注</span>
                            <div><input type='text' name={'remark'} value={this.state.remark} onChange={(r)=>{this.setState({remark:r.target.value})}} /></div>
                        </div>
                        <div className={'input'}>
                            <span className={'contents'}>排序值</span>
                            <div><input type='text' name={'sort'} value={this.state.sort} onChange={(r)=>{this.setState({sort:r.target.value})}} /></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditAccount;