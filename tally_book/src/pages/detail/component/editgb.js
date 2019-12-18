import React, {Component} from 'react';
import { createHashHistory } from 'history'
import page from "../../public/all";
import title from "../../public/title";
import ajax from "../../../func/axjs";
import {DatePicker} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
class Editgb extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id
        this.aid = this.props.match.params.aid
        this.account_id = React.createRef()
        this.state = {
            account:[],
            msg:{},
            money:'',
            account_id:'',
            date:''
        }
    }
    //获得数据
    show = ()=>{
        ajax('get','api/record/detail?id='+this.aid,'',(res)=>{
            for (let data of res.data.items){
                if (data.id==this.id){
                    this.setState({money:data.money})
                    this.setState({account_id:data.account_id})
                    this.setState({date:data.date})
                }
            }
        })
    }
    //获得账户列表
    account=  ()=>{
        ajax('get','api/account','',(res)=>{
            if (res.status){
                this.setState({account:res.data})
            }
        })
    }
    onChange= (date, dateString) => {
        this.setState({date:dateString})
    }
    //页面
    div= (res)=>{
        return(
            <div className={'txt'}>
                <div className={'input'}>
                    <span className={'contents'}>实际金额</span>
                    <div><input type='text' name={'money'} value={res.money} onChange={(r)=>this.setState({money:r.target.value})} /></div>
                </div>
                <div className={'input date'} >
                    <span className={'contents'}>日期:</span>
                    <DatePicker onChange={this.onChange} placeholder="选择日期"   locale={locale} />
                </div>
                <div className={'input'} >
                    <span className={'contents'}>账户:</span>
                    <select className={'select'} name="account_id" ref={this.account_id} onChange={(r)=>this.setState({account_id:r.target.value})} >
                        {
                            this.state.account.map((result)=>{
                                return(
                                    <option value={result.id} key={result} selected={result.id==res.account_id?'selected':''}>{result.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        )
    }
    //提交数据
    submit = ()=>{
        let data = {
            money :this.state.money,
            account_id:this.state.account_id,
            date:this.state.date
        }
        ajax('post','api/record/item/update?itemId='+this.id,data,(res)=>{
            if (res.status){
                createHashHistory().push('/detail/accounts/'+this.aid)
            }else{
                alert(res.data)
            }
        })
    }
    componentDidMount() {
        this.show()
        this.account()
    }
    render() {
        return (
            <div>
                {page( title('/detail/accounts/'+this.aid,'修改信息','','保存',this.submit),this.div(this.state))}
            </div>
        );
    }
}

export default Editgb;