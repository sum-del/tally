import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { createHashHistory } from 'history'
import title from "../../public/title";
import line from "../../public/line";
import ajax from "../../../func/axjs";
import {successToast,failToast,loadingToast} from '../../public/hint'
import './GB.css'
import del from "../../public/delete";
class Gb extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id
        this.state = {

        }
    }
    //获得数据
    show = ()=>{
        ajax('get','api/record/detail?id='+this.id,'',(res)=>{
            this.setState(res.data)
            console.log(res.data)
        })
    }
    //删除
    del = ()=>{
        ajax('post','api/record/delete?id='+this.id,'',(res)=>{
            console.log(res.data)
            if (res.status){
                successToast('删除成功')
                createHashHistory().push('/detail')
            }
        })
    }
    detail = ()=>{
        createHashHistory().push('/detail/accounts/'+this.id)
    }
    componentDidMount() {
        this.show()
    }
    render() {
        return (
            <div className={'Gb'}>
                {title('/detail',this.state.category_name,'','详情',this.detail)}
                <div className={'main'}>
                    {line('用户',this.state.user_nickname)}
                    {line('账户',this.state.items&&this.state.items[0].account_name)}
                    {line('类型',this.state.type_string)}
                    {line('记账金额',this.state.total_money)}
                    {line('实际金额',this.state.paid_money)}
                    {line('备注',this.state.remark)}
                    {line('日期',this.state.created_at)}
                </div>
                <div className={'bg'}></div>
                <div className={'foot'}>
                    <Link to={'/detail/edit/'+this.id}><div className={'bl'}>编辑</div></Link>
                    {del(<div className={'br'}>删除</div>,this.id,this.del)}
                </div>
            </div>
        );
    }
}

export default Gb;