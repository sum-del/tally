import React, {Component} from 'react';
import './input.css'
class Input extends Component {
    constructor(props){
        super(props)
        this.state={
            res:'',
            phone:''
        }
    }
    render() {
        return (
            <div>
                <input type="text" name={this.state.res}/>
            </div>
        );
    }
}

export default Input;