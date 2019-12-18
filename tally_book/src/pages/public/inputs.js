import React from 'react'
let inputs = (content,name,ref,value='',type='text')=>{
    return (
        <div className={'input'}>
            <span className={'contents'}>{content}</span>
            <div><input type={type} name={name} ref={ref} /></div>
        </div>
    )
}
export default inputs