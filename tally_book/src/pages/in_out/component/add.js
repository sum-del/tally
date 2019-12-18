import React, {Component} from 'react';
import {successToast,failToast,loadingToast} from '../../public/hint'
import './add.css'
import inputs from "../../public/inputs";
import title from "../../public/title";
import ajax from "../../../func/axjs";
import {msgbox, push} from "../../public/msgbox";
class Add extends Component {
    constructor(props) {
        super(props);
        this.name = React.createRef()
        this.type = React.createRef()
        this.sort = React.createRef()
        this.state = {
            parent_id:0,
            name: '',
            type:'',
            sort:''
        }
    }
    //提交增加
    submit = ()=>{
        let data = {
            parent_id:0,
            name: this.name.current.value,
            type:this.type.current.value,
            sort:this.sort.current.value
        }
        ajax('post','api/category/create',data,(res)=>{
            if(res.status){
                successToast('添加成功')
                setTimeout(()=>{push('/inout')},1000)
            }else{
                failToast(res.data)
            }
        })
    }
    render() {
        return (
            <div className={'addtype'}>
                {title('/inout','新增类别','','新增 \ue609',this.submit)}
                <div className={'body'} >
                    <div className={'txt'}>
                        {inputs('名称:','name',this.name)}
                        <div className={'input'} >
                            <span className={'contents'}>类型:</span>
                            <select className={'select'} name="type" ref={this.type}>
                                <option value="1">收入</option>
                                <option value="2">支出</option>
                            </select>
                        </div>
                        {inputs('排序值:','sort',this.sort)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Add;