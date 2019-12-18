import React, {Component} from 'react';
import title from "../../public/title";
import inputs from "../../public/inputs";
import ajax from "../../../func/axjs";
import {msgbox, push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'
import page from "../../public/all";
import { DatePicker, List } from 'antd-mobile';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
class Addtally extends Component {
    constructor(props) {
        super(props);
        this.total_money =  React.createRef()
        this.money = React.createRef()
        this.account_id = React.createRef()
        this.company_name = React.createRef()
        this.date = React.createRef()
        this.remark = React.createRef()
        this.state = {
            account_list :[],
            date:now
        }
    }
    //获得账户列表
    account=  ()=>{
        ajax('get','api/account','',(res)=>{
            if (res.status){
                this.setState({account_list:res.data})
            }
        })
    }
    //提交数据
    submit = ()=>{
        var d = new Date(this.state.date);
        var time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        // console.log(time)
        let data = {
            total_money:this.total_money.current.value,
            money:this.money.current.value,
            account_id:this.account_id.current.value,
            category_id:this.props.match.params.id,
            date:time,
            company_name:this.company_name.current.value,
            remark:this.remark.current.value,
            image_keys:''
        }
        ajax('post','api/record/create',data,(res)=>{
            console.log(res.data)
            if (res.status){
                successToast('添加成功')
                setTimeout(()=>{push('/detail')},1000)
            }else{
                failToast(res.data)
            }
        })
    }
    onChange= (date, dateString) => {
        console.log(dateString);
        this.setState({date:dateString})
    }
    div = ()=>{
        return(
            <div>
                {inputs('记账金额:','total_money',this.total_money)}
                {inputs('实付金额:','money',this.money)}
                <div className={'input'} >
                    <span className={'contents'}>账户:</span>
                    <select className={'select'} name="account_id" ref={this.account_id}>
                        {
                            this.state.account_list.map((res)=>{
                                return(
                                    <option value={res.id}>{res.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className={'input '}>
                    <span className={'contents'}>日期:</span>
                    <DatePicker
                        mode="date"
                        title="Select Date"
                        extra="Optional"
                        value={this.state.date}
                        onChange={date => {this.setState({date:date})}}>
                        <List.Item arrow="horizontal"></List.Item>
                    </DatePicker>
                </div>
                {inputs('交易对象:','company_name',this.company_name)}
                {inputs('备注:','remark',this.remark)}
                {/*{inputs('图片:','image_keys',this.image_keys)}*/}
            </div>
        )
    }
    componentDidMount() {
        this.account()
    }
    render() {
        return (
            <div>
                {page(title('/tally','记一笔','','完成',this.submit),this.div())}
            </div>
        );
    }
}

export default Addtally;