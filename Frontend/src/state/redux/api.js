import { Provider as ReduxProvider } from "react-redux";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {ACTIONS_CREATORS} from './impl/actions.js';

import store from './impl/store.js';

function buildProvider() {
    return (props)=> {
        return (
        <ReduxProvider store = {store}>
            {props.children}
        </ReduxProvider>
       );
    };
};

function useLoginListener() {
    return useSelector((state) => state.value);
};

function useLoginDispatcher() {
    const dispatch = useDispatch();
    return async(props) => {
        const login = props;
        dispatch(ACTIONS_CREATORS.UPDATE(login));
    };
};

export { buildProvider,useLoginListener,useLoginDispatcher }