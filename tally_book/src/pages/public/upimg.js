import React, {Component} from 'react';
import title from "./title";
import ajax from "../../func/axjs";
import {msgbox,push} from "./msgbox";
import './upimg.css'
//修改个人信息,并上传头像
class Upimg extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            username:'',
            avatar:'',
            imgurl:''
        }
    }
    submit = () => {
        //获取对象\
        let formData = new FormData();
        //获得文件信息
        let fileObj = this.fileInput.current.files[0]
        formData.append('file',fileObj)
        //上传头像
        ajax('post','api/upload/image',formData,(res)=>{
            if (res.data.status){
                this.setState({avatar:res.data.file.fileKey,imgurl:res.data.file.thumbnailUrl._temp})
            }
        },"multipart/form-data")
        console.log(this.state)
    };
    //保存提交
    up = ()=>{
        ajax('post','api/user/profile/update',this.state,(res)=>{
            if(res.status){
                msgbox('修改成功')
                setTimeout(()=>{push('/users')},1000)
            }else{
                alert(res.data)
            }
        })
    }
    render() {
        return(
            <div className={'upimage'}>
                {title('/users','修改头像','','保存',this.up)}
                <div className={'body'} >
                    <div className={'txt'}>
                        <div className={'input'}>
                            <span className={'contents c1'}>头像:</span>
                            <span className={'upfile'}>
                                {
                                    this.state.imgurl==''?<div><span>+</span><input type="file" name={'file'}  ref={this.fileInput} onChange={this.submit}/></div>:<img src={this.state.imgurl} width={90} height={90} className={'img'}/>
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Upimg;