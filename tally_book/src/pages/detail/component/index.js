import React, {Component} from 'react'
import qs from 'qs';
import title from "../../public/title";
import bottom from '../../public/bottom'
import {Link} from 'react-router-dom'
import locale from 'antd/es/date-picker/locale/zh_CN';
import { DatePicker } from 'antd';
import './mydetail.css'
import ajax from "../../../func/axjs";
const date = new Date()
var month = date.getMonth()+1
var p= 2
var top
class MyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            name:[],
            start:'',
            end:'',
            account:[],
            category:[],
            in:'',
            out:''
        }
        this.account_id = React.createRef()
        this.type = React.createRef()
        this.category = React.createRef()
        this.scroll = React.createRef()
    }
    //获得账户列表
    account=  ()=>{
        ajax('get','api/account','',(res)=>{
            if (res.status){
                this.setState({account:res.data})
            }
        })
    }
    //获得数据
    show = (data='',page=1)=>{
        ajax('get','api/record/account'+data+'?page='+page,'',(res)=>{
            this.setState({in:res.data.in})
            this.setState({out:res.data.out})
            this.setState({list:[...this.state.list,...res.data.list]})
        })
        // ajax('get','api/record/real'+data,'',(res)=>{
        //     console.log(res.data)
        //     this.setState({list:res.data})
        // })
    }
    //开始日期
    start= (date, dateString) => {
        this.setState({start:dateString})
    }
    //结束日期
    end= (date, dateString) => {
        this.setState({end:dateString})
    }
    //获得类别类型
    category_id =  ()=>{
        ajax('get','api/category?type='+this.type.current.value,'',(res)=>{
            if (res.status){
                this.setState({category:res.data})
            }
        })
    }
    //改变筛选状态
    change = ()=>{
        if (document.getElementById('screen').style.display=='none'){
            document.getElementById('screen').style.display='block'
        }else{
            document.getElementById('screen').style.display='none'
        }
    }
    //提交搜索
    submit = ()=>{
        document.getElementById('screen').style.display='none'
        let data = {
        }
        //判断值是否为空
        if (this.state.start!=''){
            data.begin_date = this.state.start
        }
        if (this.state.end!=''){
            data.end_date =this.state.end
        }
        if (this.category.current.value!=''){
            data.category_id =this.category.current.value
        }
        if (this.type.current.value!=''){
            data.type = this.type.current.value
        }
        // if (this.account_id.current.value!=''){
        //     data.account_id =this.account_id.current.value
        // }
        let str = '?'+qs.stringify(data)
        if(str=='?'){
          str=''
        }
        this.show(str)
    }
    componentDidMount() {
        this.show('')
        this.account()
    }
    roll = ()=>{
        if (this.scroll) {
            if (this.scroll.scrollTop%480==0&&this.scroll.scrollTop!=0){
                this.show('',p)
                p++
                top = this.scroll.scrollTop
                console.log(top)
            }
            if (this.scroll.scrollTop%480==0&&this.scroll.scrollTop<top&&this.scroll.scrollTop!=0){
                this.show('',p)
                p--
            }
        }
    }
    render() {
        return (
            <div className={'mydetail'}  onScroll={this.roll} >
                <div className={'top'}>
                    <div className={'head'}>
                        {title('/detail','一起记账','\ue607')}
                        <div className={'hb'}>
                            <ul>
                                <li className={'date'}>
                                    <div>2019年</div>
                                    <div className={'fb'} onClick={this.change}>
                                        <span className={'big'}>{month}</span>
                                        <span>月</span>
                                        <span className={'iconfont fj'} >&#xe673;</span>
                                    </div>
                                </li>
                                <li className={'in'}>
                                    <div>总收入</div>
                                    <div className={'fb'}>
                                        <span className={'big'}>{this.state.in}</span>
                                        <span>.00</span>
                                    </div>
                                </li>
                                <li className={'out'}>
                                    <div>总支出</div>
                                    <div className={'fb'}>
                                        <span className={'big'}>{this.state.out}</span>
                                        <span>.00</span>
                                    </div>
                                </li>
                            </ul>
                            <div className={'screen'} style={{display:'none'}} id={'screen'} >
                                <div className={'lines'}>
                                    <div className={'list date'}>
                                        <span className={'contents'}>开始日期:</span>
                                        <DatePicker onChange={this.start} placeholder="start"  locale={locale} />
                                    </div>
                                </div>
                                <div className={'lines'}>
                                    <div className={'list date'} >
                                        <span className={'contents'}>结束日期:</span>
                                        <DatePicker onChange={this.end} placeholder="end"  locale={locale} />
                                    </div>
                                </div>
                                <div className={'lines'}>
                                    <div className={'contents'}>类型:</div>
                                    <div className={'list'} >
                                        <select className={'select'} name="type" ref={this.type} onChange={this.category_id}>
                                            <option value="">不选择</option>
                                            <option value="1">收入</option>
                                            <option value="2">支出</option>
                                        </select>
                                    </div>
                                </div>
                                    {/*<div className={'lines'}>*/}
                                {/*    <div className={'contents'}>账户:</div>*/}
                                {/*    <div className={'list'} >*/}
                                {/*        <select className={'select'} name="account" ref={this.account_id}>*/}
                                {/*            <option value="">不选择</option>*/}
                                {/*            {*/}
                                {/*                this.state.account.map((res)=>{*/}
                                {/*                    return(*/}
                                {/*                        <option value={res.id}>{res.name}</option>*/}
                                {/*                    )*/}
                                {/*                })*/}
                                {/*            }*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className={'lines'}>
                                    <div className={'contents'}>类别:</div>
                                    <div className={'list'} >
                                        <select className={'select'} name="category" ref={this.category} >
                                            <option value="">不选择</option>
                                            {
                                                this.state.category.map((res)=>{
                                                    return(
                                                        <option value={res.id}>{res.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className={'lines'}>
                                    <input type="button" className={'button'} value={'提交'} onClick={this.submit}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className={'func_ul'}>
                        <Link to={'/inout'}><li className={'iconfont'}>&#xe66e;</li></Link>
                        <Link><li className={'iconfont'}>&#xe60a;</li></Link>
                        <Link><li className={'iconfont'}>&#xe660;</li></Link>
                        <Link><li className={'iconfont'}>&#xe629;</li></Link>
                        <Link><li className={'iconfont'}>&#xe7b5;</li></Link>
                    </ul>
                    <div className={'title'} >
                        <div className={'dl'}>时间</div>
                        <div className={'dc'}>类型</div>
                        <div className={'dr'}>
                            <span>金额</span>
                        </div>
                    </div>
                </div>
                <div className={'body'}  >
                    <div className={'activity m1'} onScroll={this.roll} ref={e => (this.scroll = e)}>
                        {
                        this.state.list&&this.state.list.map((res)=>{return(
                                <Link key={res} to={'/detail/Gb/'+res.id}>
                                    <div className={'dates'} >
                                        <div className={'dl'}>{res.date}</div>
                                        <div className={'dc'}>{res.type_string}</div>
                                        <div className={'dr'}>
                                            <span>{res.paid_money}元</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                    </div>
                </div>
                {bottom('fc','','','','')}
            </div>
        );
    }
}

export default MyDetail;