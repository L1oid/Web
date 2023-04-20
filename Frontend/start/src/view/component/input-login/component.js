import React from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ACTIONS_CREATORS } from '../../redux/actions.js';

function InputLogin(props) {
    const value = useSelector((state) => state.value);
    const dispatch = useDispatch();

    let handle = async (event) => {
        let action = ACTIONS_CREATORS.UPDATE(event.target.value);
        dispatch(action);
        props.getValue(event.target.value);
    };

    return (
        <div>
            <input type='login' placeholder={props.placeholder} value={value} onChange={handle}/>
        </div>    
    );
}

export default InputLogin;