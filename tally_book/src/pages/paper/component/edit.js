import React, {Component} from 'react';
import title from "../../public/title";
import {successToast,failToast,loadingToast} from '../../public/hint'
import line from "../../public/line";
import ajax from "../../../func/axjs";
import {msgbox, push} from "../../public/msgbox";
class Edit extends Component {
    constructor(props) {
        super(props);
        this.id  = this.props.match.params.id
        this.state = {
        }
    }
    show = ()=>{
        ajax('get','api/book/detail?book_id='+this.id,'',(res)=>{
            this.setState(res.data)
        })
    }
    submit = ()=>{
        console.log(this.state.name)
        ajax('post','api/book/update',{book_id:this.id,book_name:this.state.name},(res)=>{
            if (res.status){
                successToast('增加成功')
                setTimeout(()=>{push('/paper')},1000)
            }else{
                failToast(res.data)
            }
        })
    }
    componentDidMount() {
        this.show()
    }
    render() {
        return (
            <div className={'Gb'}>
                {title('/paper/detail/'+this.id,'修改账簿','','保存',this.submit)}
                <div className={'main'}>
                    <div className={'gline'}>
                        <div className={'left'}>账簿名</div>
                        <div className={'right'}><input type="text" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}/></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;