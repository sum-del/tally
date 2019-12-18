import React from "react";
import './line.css'
let line = (name,text)=>{
    return(
        <div className={'gline'}>
            <div className={'left'}>{name}</div>
            <div className={'right'}><input type="text" value={text} readOnly/></div>
        </div>
    )
}
export default line