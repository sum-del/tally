import React, {Component} from 'react';
import '../../login/components/login.css'
import ajax from "../../../func/axjs";
import title from "../../public/title";
import foot from "../../public/foot";
import { createHashHistory } from 'history'
class Detail extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id
        this.state= {
        }
    }
    //获得这个id的信息
    getuser = ()=>{
        ajax('get','api/account/detail?id='+this.id,'',(res)=>{
            if (res.status){
                this.setState(res.data)
            }
        })
    }
    componentDidMount() {
        this.getuser()
    }
    //删除账户的方法
    del = (id)=>{
        ajax('post','api/account/delete?id='+id,'',(res)=>{
            if (res.status){
                createHashHistory().push('/account')
            }
        })
    }
    render() {
        return(
            <div className={'addtype'}>
                <div className={'head'}>
                    {title('/account','账户详情','')}
                </div>
                <div className={'body'} >
                    <div className={'txt'}>
                        <div className={'input'}>
                            <span className={'contents'}>账户名:</span>
                            <div><input type='text' name={'name'} value={this.state.name} readOnly /></div>
                        </div>
                        <div className={'input'} >
                            <span className={'contents'}>类型:</span>
                            <div><input type='text' name={'initial_balance'} value={this.state.type} readOnly/></div>
                        </div>
                        <div className={'input'}>
                            <span className={'contents'}>余额:</span>
                            <div><input type='text' name={'initial_balance'} value={this.state.initial_balance} readOnly/></div>
                        </div>
                        <div className={'input'}>
                            <span className={'contents'}>备注:</span>
                            <div><input type='text' name={'remark'} value={this.state.remark} readOnly /></div>
                        </div>
                    </div>
                </div>
                {foot(this.id,'/account/edit_account/',this.del)}
            </div>
        )
    }
}

export default Detail;