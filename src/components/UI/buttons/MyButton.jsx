import React from 'react';
import classes from './MyButton.module.css';


const MyButton = ({children, ...props}) => {
    return (
        <div>
            <button className = {classes.myBtn} {...props}>{children}</button>
        </div>
    )
}


export default MyButton;