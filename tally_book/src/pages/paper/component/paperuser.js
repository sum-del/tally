import React, {Component} from 'react';
import table from "../../public/table";
import title from "../../public/title";
import { createHashHistory } from 'history'
import ajax from "../../../func/axjs";
import del from "../../public/delete";
class User extends Component {
    constructor(props) {
        super(props);
        this.id  = this.props.match.params.id
        this.state= {
            list:[]
        }
    }
    //删除
    del = (id)=>{
        ajax('post','api/member/delete?user_id='+id+'&'+'book_id='+this.id,'',(res)=>{
            if (res.status){
                window.location.reload()
            }else{
                alert(res.data)
            }
        })
    }
    //获取数据
    show = ()=>{
        ajax('get','api/member?book_id='+this.id,'',(res)=>{
            console.log(res.data)
            this.setState({list:res.data})
        })
    }
    th = ()=>{
        return(
            <tr>
                <th>手机号</th>
                <th>昵称</th>
                <th>操作</th>
            </tr>
        )
    }
    td = ()=>{
        if (this.state.list[0]!=null){
            return(
                this.state.list&&this.state.list.map((res)=>{
                    return(
                        <tr>
                            <td>{res.mobile}</td>
                            <td>{res.nickname}</td>
                            <td className={'action'}>
                                {del(<span onClick={()=>this.del(res.id)}>删除</span>)}
                            </td>
                        </tr>
                    )
                })
            )
        }else{
            return (
                <tr className={'null'}>
                    <td colSpan={4} className={'iconfont'}>&#xe6b6;<span>暂无数据</span></td>
                </tr>
            )
        }
    }
    push = ()=>{
        createHashHistory().push('/paper/adduser/'+this.id)
    }
    componentDidMount() {
        this.show()
    }
    render() {
        return (
            <div>
                {table(title('/paper/detail/'+this.id,'记账成员','','邀请成员',this.push),this.th(),this.td())}
            </div>
    )
    }
}

export default User;