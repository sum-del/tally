import React, {Component} from 'react';
import {Link} from "react-router-dom";
import title from "../../public/title";
import { createHashHistory } from 'history'
import line from "../../public/line";
import ajax from "../../../func/axjs";
import del from "../../public/delete";
class Detail extends Component {
    constructor(props) {
        super(props);
        this.id  = this.props.match.params.id
        this.state = {}
    }
    show = ()=>{
        ajax('get','api/book/detail?book_id='+this.id,'',(res)=>{
            this.setState(res.data)
        })
    }
    del = ()=>{
        ajax('post','api/book/delete?book_id='+this.id,'',(res)=>{
            if (res.status){
                createHashHistory().push('/paper')
            }else{
                alert(res.data)
            }
        })
    }
    push = ()=>{
        createHashHistory().push('/paper/user/'+this.state.id)
    }
    componentDidMount() {
        this.show()
    }
    render() {
        return (
            <div className={'Gb'}>
                {title('/paper','账簿详情','','记账成员',this.push)}
                <div className={'main'}>
                    {line('账簿名',this.state.name)}
                    {line('用户名',this.state.user_name)}
                    {line('创建时间',this.state.created_at)}
                    {line('修改时间',this.state.updated_at)}
                </div>
                <div className={'foot'}>
                    <div className={'bl'}><Link to={'/paper/edit/'+this.id}>编辑</Link></div>
                    {del(<div className={'br'}>删除</div>,this.id,this.del)}
               </div>
            </div>
        );
    }
}
export default Detail;