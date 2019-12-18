import React, {Component} from 'react';
import table from "../../public/table";
import title from "../../public/title";
import {Link} from "react-router-dom";
import ajax from "../../../func/axjs";
class Accounts extends Component {
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
    th = ()=>{
        return(
            <tr>
                <th>账户</th>
                <th>金额</th>
                <th>操作</th>
            </tr>
        )
    }
    td = ()=>{
        return(
            this.state.items&&this.state.items.map((res)=>{
                return(
                    <tr>
                        <td>{res.account_name}</td>
                        <td>{res.money}</td>
                        <td>
                            <Link to={'/detail/editgb/'+res.id+'/'+this.state.id}>修改</Link>
                            <span>删除</span>
                        </td>
                    </tr>
                )
            })
        )
    }
    componentDidMount() {
        this.show()
    }
    render() {
        return (
            <div className={'accounts'}>
                {table(title('/detail/Gb/'+this.state.id,'详情'),this.th(),this.td())}
            </div>
        );
    }
}

export default Accounts;