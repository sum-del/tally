import React, {Component} from 'react';
import title from "../../public/title";
import ajax from "../../../func/axjs";
import page from "../../public/all";
import {msgbox, push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'
class Edit extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id
        this.state = {
        }
    }
    //获得这个id的信息
    getmsg  = ()=>{
        ajax('get','api/record/detail?id='+this.id,'',(res)=>{
            if (res.status){
               this.setState(res.data)
            }
        })
    }
    //修改信息
    submit = ()=>{
        let data = {
            total_money  :this.state.total_money,
            company_name  :this.state.company_name,
            remark  :this.state.remark
        }
        ajax('post','api/record/update?id='+this.id,data,(res)=>{
            if (res.status){
                successToast('添加成功')
                setTimeout(()=>{push('/inout')},1000)
            }else{
                failToast(res.data)
            }
        })
    }
    //页面
    div= ()=>{
        return(
            <div className={'txt'}>
                <div className={'input'}>
                    <span className={'contents'}>记账金额</span>
                    <div><input type='text' name={'total_money'} value={this.state.total_money} onChange={(r)=>this.setState({total_money:r.target.value})} /></div>
                </div>`
                <div className={'input'}>
                    <span className={'contents'}>交易对象</span>
                    <div><input type='text' name={'company_name'} value={this.state.company_name} onChange={(r)=>this.setState({company_name:r.target.value})} /></div>
                </div>
                <div className={'input'}>
                    <span className={'contents'}>备注</span>
                    <div><input type='text' name={'remark'} value={this.state.remark} onChange={(r)=>this.setState({remark:r.target.value})} /></div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getmsg()
    }
    render() {
        return (
            <div>
                {page( title('/detail/Gb/'+this.id,'修改信息','','保存',this.submit),this.div())}
            </div>
        );
    }
}

export default Edit;