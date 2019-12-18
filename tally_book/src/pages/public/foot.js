import React from "react";
import {Link} from "react-router-dom";
import del from "./delete";
import './foot.css'
let foot = (id,path,func)=>{
    return(
        <div className={'foot'}>
            <div className={'bl'}><Link to={path+id}>编辑</Link></div>
            {del(<div className={'br'} >删除</div>,id,func)}
        </div>
    )
}
export default foot
