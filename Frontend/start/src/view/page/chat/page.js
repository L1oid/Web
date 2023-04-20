import React from "react";

import { Provider } from 'react-redux';
import Store from '../../redux/store.js';

import ButtonsMenu from '../../component/buttons-menu/component.js';
import UserChat from '../../component/user-chat/component.js';

function ChatPage() {
    return (
        <Provider store = {Store} >
            <div>
                <ButtonsMenu />
                <UserChat />
            </div>
        </Provider>        
    )
}

export default ChatPage

/*import React, { useState } from "react";

import { Provider } from 'react-redux';
import Store from '../../redux/store.js';

import ButtonsMenu from '../../composition/buttons-menu/component.js';
import { SLAEFactory } from '../../../domain/service.js'

function ChatPage() {

    function echo() {
        let slae = SLAEFactory.createInstance();
        slae.echo();
    }

    function counter() {
        let slae = SLAEFactory.createInstance();
        slae.counterAsync();
    }

    return (
        <Provider store = {Store} >
            <div>
                <ButtonsMenu />
                <button onClick={echo}>Echo</button>
                <br></br><br></br>
                <button onClick={counter}>CounterAsync</button>
            </div>
        </Provider>        
    )
}

export default ChatPage*/