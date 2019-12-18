import React, {Component} from 'react';
import inputs from '../../public/inputs'
import '../../login/components/input.css'
import '../../login/components/login.css'
import './add_account.css'
import ajax from "../../../func/axjs";
import title from "../../public/title";
import {msgbox, push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'
class AddAccount extends Component {
    constructor(props) {
        super(props);
        this.name = React.createRef()
        this.balance = React.createRef()
        this.type = React.createRef()
        this.remark = React.createRef()
        this.sort = React.createRef()
        this.state = {
            name:this.name,
            balance:this.balance,
            type:this.type,
            remark:this.remark,
            sort:this.sort
        }
    }
    submit = ()=>{
        let data = {
            name:this.state.name.current.value,
            initial_balance :this.state.balance.current.value,
            type:this.state.type.current.value,
            remark:this.state.remark.current.value,
            sort:this.state.sort.current.value
        }
        ajax('post','api/account/create',data,(res)=>{
            if (res.status){
                successToast('添加成功')
                setTimeout(()=>{push('/account')},1000)
            }else{
                failToast(res.data)
            }
        })
    }
    render() {
        return(
            <div className={'addtype'}>
                {title('/account','添加账户','','保存',this.submit)}
                <div className={'body'} >
                    <div className={'txt'}>
                        {inputs('账户名:','name',this.name)}
                         <div className={'input'} >
                             <span className={'contents'}>类型:</span>
                             <select className={'select'} name="type" ref={this.type}>
                                 <option value="1">现金</option>
                                 <option value="2">银行</option>
                                 <option value="3">支付平台</option>
                                 <option value="4">其他</option>
                             </select>
                         </div>
                         {inputs('余额:','initial_balance',this.balance)}
                         {inputs('备注:','remark',this.remark)}
                         {inputs('排序值:','sort',this.sort)}
                    </div>
                </div>
            </div>
        )
    }
}

export default AddAccount;