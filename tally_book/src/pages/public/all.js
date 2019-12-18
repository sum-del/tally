import React from "react";
let page = (title,div)=>{
    return(
        <div className={'addtype'}>
            <div className={'head'}>
                {title}
            </div>
            <div className={'body'} >
                    {div}
            </div>
        </div>
    )
}
export default page