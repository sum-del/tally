import React, {Component} from 'react';
import { createHashHistory } from 'history'
import title from "../../public/title";
import ajax from "../../../func/axjs";
import table from "../../public/table";
import del from "../../public/delete";
import './my_account.css'

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: [{id: 1405, name: "微信", balance: "0.00"}]
        }
    }
    //获得所有账户信息
    getaccount = ()=>{
        ajax('get','api/account','',(res)=>{
            if (res.status){
                this.setState({account:res.data})
            }
        })
    }
    //删除账户的方法
    del = (id)=>{
        console.log(id)
        ajax('post','api/account/delete?id='+id,'',(res)=>{
            if (res.status){
                this.getaccount()
            }else{
                alert('服务器繁忙,请稍后再试')
                this.getaccount()
            }
        })
    }
    submit = ()=>{
        createHashHistory().push('/account/add_account')
    }
    //th
    th = ()=>{
        return(
            <tr>
                <th>账户名称</th>
                <th>余额</th>
                <th>操作</th>
            </tr>
        )
    }
    //跳转
    detail = (id)=>{
        createHashHistory().push('/account/detail/'+id)
    }
    td = ()=>{
        return(
            this.state.account.map((res)=>{
                return(
                    <tr >
                        <td onClick={()=>{this.detail(res.id)}}>{res.name}</td>
                        <td onClick={()=>{this.detail(res.id)}}>{res.balance}</td>
                        <td className={'action'}>
                            {del(<span className={'detail'}>删除</span>,res.id,this.del)}
                        </td>
                    </tr>
                )
            })
        )
    }
    //挂载完成后执行
    componentDidMount() {
        this.getaccount()
    }
    render() {
        return (
                <div>
                    {table(title('/users','我的帐户','','新增账户',this.submit),this.th(),this.td())}
                </div>
        );
    }
}

export default MyAccount;