import  React from 'react'
import {Link} from "react-router-dom";
import './title.css'
let  title = (url='/detail/index',text='收入与支出',left='',right='',func)=>{
    return(
        <div className={'allhead'}>
            <div className={'flex'}>
                <Link to={url} >
                    <div className={'left iconfont '}>
                        {left==''?'\ue619':left}
                    </div>
                </Link>
            </div>
            <div className={'flex center'}><div>{text}</div></div>
            <div className={'right flex'} onClick={func}><div>{right}</div></div>
        </div>
    )
}
export default title