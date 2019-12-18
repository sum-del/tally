import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './bottom.css'
// let change=(obj)=>{
//     let objs =  document.getElementsByClassName('fc')
//     for(let i of objs){
//         i.className = ''
//     }
//     obj.currentTarget.className = 'fc'
// }
let bottom = (a,b,c,d,e)=>{
        return (
            <div className={'bottom'}>
                <ul>
                    <Link to={'/detail'}>
                        <li className={a} >
                            <div className={'iconfont'}>&#xe601;</div>
                            <div>明细</div>
                        </li>
                    </Link>
                    <Link to={'/delay'}>
                        <li className={b}  >
                            <div className={'iconfont'}>&#xe7b5;</div>
                            <div>待收待付</div>
                        </li>
                    </Link>
                    <Link to={'/tally'}>
                        <li className={`center ${c}`}>
                            <div className={'iconfont highs'}>&#xe628;</div>
                            <div className={'lous'}>记账</div>
                        </li>
                    </Link>
                    <Link>
                        <li className={d}  >
                            <div className={'iconfont'}>&#xe618;</div>
                            <div>榜单</div>
                        </li>
                    </Link>
                    <Link to={'/users'}>
                        <li className={e} >
                            <div className={'iconfont i4'}>&#xe60d;</div>
                            <div>我的</div>
                        </li>
                    </Link>
                </ul>
            </div>
        );
    }


export default bottom;