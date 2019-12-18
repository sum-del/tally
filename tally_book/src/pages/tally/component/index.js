import React, {Component} from 'react';
import head from '../../in_out/component/head'
import ajax from "../../../func/axjs";
import './inout.css'
import {Link} from "react-router-dom";
class MyTally extends Component {
    constructor(props) {
        super(props);
        this.state = {
            in:[],
            out:[]
        }
    }
    //获取收入和支出类型的结果
    show = ()=>{
        ajax('get','api/category?type=1&typeData=1  ','',(res)=>{
            this.setState({in:res.data})
        })
        ajax('get','api/category?type=2&typeData=1  ','',(res)=>{
            this.setState({out:res.data})
        })
    }
    componentDidMount() {
        this.show()
    }
    render() {
        return (
            <div className={'tally'}>
                {head()}
                <div className={'In'} style={{display:'none'}}>
                    <ul>
                        {
                            this.state.in.map((res)=>{
                                return(
                                    <Link className={'control'} to={'/tally/addtally/'+res.id}>
                                        <li>
                                            <div className={'iconfont t1'}>&#xe620;</div>
                                            <div className={'b1'}>{res.name}</div>
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={'Out'}>
                    <ul>
                        {
                            this.state.out.map((res)=>{
                                return(
                                    <Link className={'control'} to={'/tally/addtally/'+res.id}>
                                        <li>
                                            <div className={'iconfont t1'}>&#xe615;</div>
                                            <div className={'b1'}>{res.name}</div>
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
export default MyTally;
