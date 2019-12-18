import React, {Component} from 'react';
import head from "./head";
import {Link} from "react-router-dom";
import './Inout.css'
import ajax from "../../../func/axjs";
import del from "../../public/delete";
class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            in: [],
            out: []
        }
    }
    //手指触摸移动
    Move = (obj)=>{
        obj.childNodes[1].style.display = 'block'
    }
    //移除的操作
    out = ()=>{
        for (let i of document.getElementsByClassName('fix')){
            if (i.style.display == 'block'){
                i.style.display = 'none'
            }
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
    //每行的模板
    line = (text,icon,id,type)=>{
        return(
            <div className={'detail'} >
                <div className={'img'} onClick={(e)=>{
                    this.out(e.target)
                }}>
                    <span className={'iconfont detail_img'}>{icon}</span>
                    <span>{text}</span>
                </div>
                <div className={'num iconfont'} onTouchMove={(e)=>{this.Move(e.target)}} >&#xe607;
                    <div className={'fix'} >
                        {del(<div className={'del'} >删除</div>,id,this.del)}
                        <Link to={'/inout/edit/'+type+'/'+id}><div className={'edit'}>修改</div></Link>
                    </div>
                </div>
            </div>
        )
    }
    //删除功能
    del = (id)=>{
        ajax('post','api/category/delete',{id:id},(res)=>{
            if (res.status){
                this.out()
                this.show()
            }
        })
    }
    //自动挂载
    componentDidMount() {
        this.show()
    }
    render() {
        return (
            <div className={'Inout'}>
                {head()}
                <div className={'In'} style={{display:'none'}}>
                    {/*遍历支出*/}
                    {
                        this.state.in.map((res)=>{
                            return(
                                this.line(res.name,'\ue681',res.id,res.type)
                            )
                        })
                    }
                </div>
                <div className={'Out'} >
                    {/*遍历收入*/}
                    {
                        this.state.out.map((res)=>{
                            return(
                                this.line(res.name,'\ue615',res.id,res.type)
                            )
                        })
                    }
                </div>
                <div className={'bottom'}>
                    <div className={'center'}>
                        <Link to={''}>
                            <div className={'bl'}>
                                <span className={'iconfont'}>&#xe60f;</span>
                                <span>保存排序</span>
                             </div>
                        </Link>
                        <Link to={'/inout/add'}>
                            <div className={'br'}>
                                <span>+</span>
                                <span>添加类别</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Show;