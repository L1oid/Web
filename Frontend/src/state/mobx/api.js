import {useState, useEffect} from 'react';

import { observable, action, autorun } from 'mobx';

const store = observable({
    login: "",
    change: action( function change(value) {
        this.login = value;
    }),
});

function buildProvider() {
    return (props)=> {
        return (
        <>
            {props.children}
        </>
        );
    };
};

function useLoginListener() {
    const [login, update] = useState(undefined);
      
    useEffect(() => {
        function handle(result) {
            update(result);
        }
        return autorun( ()=> {
            handle(store.login);
        })
    },[]); 

    return login;
};


function useLoginDispatcher() {
    return async(props) => {
        const login = props;
        store.change(login);
    };
};

export { buildProvider, useLoginListener, useLoginDispatcher }