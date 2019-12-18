import React, {Component} from 'react';
import title from "../../public/title";
import { createHashHistory } from 'history'
import ajax from "../../../func/axjs";
import {msgbox, push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'
class Index extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            paper:[]
        }
    }
    //展示页面方法
    show = ()=>{
        ajax('get','api/book','',(res)=>{
            this.setState({paper:res.data})
        })
    }
    //跳转至添加方法
    add = ()=>{
        createHashHistory().push('/paper/insert')
    }
    //设置为默认
    set = (id)=>{
        localStorage.setItem('book_id',id)
        ajax('post','api/book/set-default',{book_id:id},(res)=>{
            if (res.status){
                successToast('设置成功')
                setTimeout(()=>{window.location.reload()},1000)
            }else{
                alert(res.data)
            }
        })
    }
    detail = (id)=>{
        createHashHistory().push('/paper/detail/'+id)
    }
    componentDidMount() {
        this.show()
    }
    render() {
        return (
            <div className={'paper'}>
                {title('/users','我的账簿','','新增账簿',this.add)}
                <table cellSpacing="0" align="center">
                    <thead>
                    <tr>
                        <th>账簿名</th>
                        <th>用户名</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.paper&&this.state.paper.map((res) => {
                            return (
                                <tr>
                                    <td onClick={()=>this.detail(res.id)} >{res.name}</td>
                                    <td onClick={()=>this.detail(res.id)} >{res.user_name}</td>
                                    <td className={'action'}>
                                        {
                                            res.id==localStorage.getItem('book_id')?<div>默认</div>:<span onClick={()=>{this.set(res.id)}}>设为默认</span>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Index;