import React from "react";
let  table =  (title,th,body)=>{
    return(
        <div className={'paper'}>
            {title}
            <table>
                <thead>
                {th}
                </thead>
                <tbody>
                {body}
                </tbody>
            </table>
        </div>
    )
}
export  default table