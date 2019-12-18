import React from 'react'
import title from "../../public/title";
import './head.css'
let change = (obj)=>{
    let arr = document.getElementsByClassName('tt')
    for(let i of arr){
        i.className = ''
    }
    if (obj.parentNode.className=='t2'){
        let a =  document.getElementsByClassName('Out')[0]
        a.style.display = 'none'
        let b =  document.getElementsByClassName('In')[0]
        b.style.display = 'block'
    }else{
        let a =  document.getElementsByClassName('Out')[0]
        a.style.display = 'block'
        let b =  document.getElementsByClassName('In')[0]
        b.style.display = 'none'
    }
    obj.className = 'tt'
}
let head = ()=>{
    return(
        <div className={'top'}>
            {title('/detail')}
            <div className={'title'}>
                <div className={'t1'} ><span className={'tt'} onClick={(e)=>{change(e.target)}}>支出</span></div>
                <div className={'t2'} ><span onClick={(e)=>{change(e.target)}}>收入</span></div>
            </div>
        </div>
    )
}
export default head