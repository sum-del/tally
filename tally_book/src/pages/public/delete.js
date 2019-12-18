import { Popconfirm, message } from 'antd';

import React from "react";
function confirm(func,id) {
    func(id)
}
let del =(a,id,func)=>{
    return(
    <Popconfirm
        title="确定要删除嘛?"
        onConfirm={()=>{confirm(func,id)}}
        okText="确定"
        cancelText="取消"
    >
        {a}
    </Popconfirm>
    )
}
export default del


