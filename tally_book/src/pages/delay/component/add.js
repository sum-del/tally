import React, {Component} from 'react';
import title from "../../public/title";
import inputs from "../../public/inputs";
import ajax from "../../../func/axjs";
import locale from 'antd/es/date-picker/locale/zh_CN';
import { DatePicker } from 'antd';
import './add.css'
import {msgbox, push} from "../../public/msgbox";
import {successToast,failToast,loadingToast} from '../../public/hint'

class Add extends Component {
    constructor(props) {
        super(props);
        this.id =  this.props.match.params.id
        this.money = React.createRef()
        this.account_id = React.createRef()
        this.fileInput= React.createRef()
        this.state = {
            account:[],
            date:'',
            avatar:''
        }
    }
    onChange= (date, dateString) => {
        this.setState({date:dateString})
    }
    //获取账户
    account = ()=>{
        ajax('get','api/account','',(res)=>{
            console.log(res.data)
            this.setState({account:res.data})
        })
    }
    //上传图片
    submit = ()=>{
        let files = new FormData
        let file =  this.fileInput.current.files[0]
        files.append('file',file)
        //上传头像
        ajax('post','api/upload/image',files,(res)=>{
            console.log(res.data)
            if (res.data.status){
                this.setState({avatar:res.data.file.fileKey})
            }
        },"multipart/form-data")
    }
    up = ()=>{
        let data = {
            money:this.money.current.value,
            account_id:this.account_id.current.value,
            date:this.state.date,
            record_id:this.id,
            img_key:this.state.avatar
        }
        ajax('post','api/record/sequel',data,(res)=>{
            if (res.data){
                successToast('提交成功')
                setTimeout(()=>{push('/delay')},1000)
            }else{
                failToast(res.data)
            }
        })
    }
    componentDidMount() {
        this.account()
    }
    render() {
        return (
            <div className={'addtype upimg'}>
                {title('/delay','后续记账','','保存',this.up)}
                <div className={'body'} >
                    <div className={'txt'}>
                        {inputs('实付金额:','money',this.money)}
                        <div className={'input'} >
                            <span className={'contents'}>账户:</span>
                            <select className={'select'} name="account_id" ref={this.account_id}>
                                {
                                    this.state.account.map((res)=>{
                                        return(
                                            <option value={res.id} key={res}>{res.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className={'input'}>
                            <span className={'contents c1'}>图片:</span>
                            <span className={'upfile'}><span>上传图片</span><input type="file" name={'file'}  ref={this.fileInput}/></span>
                        </div>
                        <div className={'input date'} onClick={this.submit}>
                            <span className={'contents'}>日期:</span>
                            <DatePicker onChange={this.onChange} placeholder="选择日期"  locale={locale} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Add;