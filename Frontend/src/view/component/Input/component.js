import React from "react";

function Input(props) {
    return (
        <input className={props.class} type={props.type} placeholder={props.placeholder} onChange={(e) => props.getValue(e.target.value)} required />
    )
}

export default Input;