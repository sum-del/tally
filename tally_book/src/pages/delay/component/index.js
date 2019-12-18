import React, {Component} from 'react';
import title from "../../public/title";
import bottom from "../../public/bottom";
import ajax from "../../../func/axjs";
import {Link} from "react-router-dom";
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wait_out:[],
            wait_in:[],
            name:[]
        }
    }
    //获得数据
    show = ()=>{
        ajax('get','api/record/account/waiting?type=2','',(res)=>{
            console.log(res.data)
            this.setState({wait_out:res.data})
        })
        ajax('get','api/record/account/waiting?type=1','',(res)=>{
            console.log(res.data)
            this.setState({wait_in:res.data})
        })
    }
    move  = (obj)=>{
        if (obj.currentTarget.style.left == '-130px'){
            obj.currentTarget.style.left = '0px'
        }else{
            obj.currentTarget.style.left = '-130px'
        }
    }
    componentDidMount() {
        this.show()
    }
    render() {
        return (
            <div className={'mydetail'}>
                <div className={'top'}>
                    <div className={'head'}>
                        {title('/delay','收入与支出','\ue681',)}
                        <div className={'hb'}>
                            <ul>
                                <li className={'date'}>
                                    <div>2019年</div>
                                    <div className={'fb'}>
                                        <span className={'big'}>12</span>
                                        <span>月</span>
                                        <span className={'iconfont fj'}>&#xe673;</span>
                                        {/*<div className={'screen'} >*/}
                                        {/*</div>*/}
                                    </div>
                                </li>
                                <li className={'in'}>
                                    <div>待收</div>
                                    <div className={'fb'}>
                                        <span className={'big'}>{this.state.wait_in.total}</span>
                                        <span>.00</span>
                                    </div>
                                </li>
                                <li className={'out'}>
                                    <div>待付</div>
                                    <div className={'fb'}>
                                        <span className={'big'}>{this.state.wait_out.total}</span>
                                        <span>.00</span>
                                    </div>
                                </li>
                            </ul>
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
                <div className={'body'}>
                    <div className={'activity'} >
                        {
                            this.state.wait_in.list&&this.state.wait_in.list.map((res)=>{
                                return(
                                    <div className={'dates hang'} key={res} >
                                        <div className={'dw'} onClick={(e)=>{this.move(e)}}>
                                            <div className={'dl'}>{res.date}</div>
                                            <div className={'dc'}>待收</div>
                                            <div className={'dr'}>
                                                <span>{res.total_money-res.paid_money}元</span>
                                            </div>
                                            <div className={'dd'}><Link to={'/delay/add/'+res.id}>补充</Link></div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            this.state.wait_out.list&&this.state.wait_out.list.map((res)=>{
                                return(
                                    <div className={'dates hang'}  key={res} >
                                        <div className={'dw'} onClick={(e)=>{this.move(e)}}>
                                            <div className={'dl'}>{res.date}</div>
                                            <div className={'dc'}>待付:</div>
                                            <div className={'dr'}>
                                                <span>{res.total_money-res.paid_money}元</span>
                                            </div>
                                            <div className={'dd'}><Link to={'/delay/add/'+res.id}>补充</Link></div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {bottom('','fc')}
            </div>
        );
    }
}

export default Index;