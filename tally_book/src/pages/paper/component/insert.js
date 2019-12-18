import React, {Component} from 'react';
import title from "../../public/title";
import '../../in_out/component/add.css'
import {msgbox,push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'
import inputs from "../../public/inputs";
import ajax from "../../../func/axjs";
class Insert extends Component {
    constructor(props) {
        super(props);
        this.name = React.createRef()
    }
    submit = ()=>{
        ajax('post','api/book/create',{name:this.name.current.value},(res)=>{
            if (res.status){
                successToast('添加成功,2秒后跳转至首页')
                setTimeout(()=>{push('/paper')},3000)
            }else{
                failToast(res.data)
            }
        })
    }

    render() {
        return (
            <div className={'addtype'}>
                {title('/paper','添加账簿','','保存',this.submit)}
                <div className={'body'} >
                    <div className={'txt'}>
                        {inputs('名称:','name',this.name)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Insert;