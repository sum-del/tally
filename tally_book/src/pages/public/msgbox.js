import {  message } from 'antd';
import React from "react";
import { createHashHistory } from 'history'
const key = 'updatable';

const msgbox = (text) => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
        message.success({ content:text, key, duration: 1 });
    }, 500);
};

function push(url) {
    createHashHistory().push(url)
}
export {msgbox,push}
