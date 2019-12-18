import React, {Component} from 'react';
import './add.css'
import title from "../../public/title";
import ajax from "../../../func/axjs";
import {msgbox, push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'
class Edit extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id
        this.type = this.props.match.params.type
        this.state = {
        }
    }
    //获得这个id的信息
    getuser  = ()=>{
        ajax('get','api/category?typeData=1&type='+this.type,'',(res)=>{
            if (res.status){
                for (let list of res.data){
                    if (list.id == this.id){
                        this.setState(list)
                    }
                }
            }
        })
    }
    //修改信息
    submit = ()=>{
        ajax('post','api/category/update?id='+this.id,this.state,(res)=>{
            if (res.status){
                successToast('修改成功')
                setTimeout(()=>{push('/inout')},1000)
            }else{
                failToast(res.data)
            }
        })
    }
    componentDidMount() {
        this.getuser()
    }
    render() {
        return (
            <div className={'addtype'}>
                <div className={'head'}>
                    {title('/inout','修改类别','','保存',this.submit)}
                </div>
                <div className={'body'} >
                    <div className={'txt'}>
                        <div className={'input'}>
                            <span className={'contents'}>名称</span>
                            <div><input type='text' name={'name'} value={this.state.name} onChange={(r)=>this.setState({name:r.target.value})} /></div>
                        </div>
                        <div className={'input'}>
                            <span className={'contents'}>排名</span>
                            <div><input type='text' name={'sort'} value={this.state.sort} onChange={(r)=>this.setState({sort:r.target.value})} /></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Edit;