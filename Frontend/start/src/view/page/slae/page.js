import React from "react";

import ButtonsMenu from '../../component/buttons-menu/component.js';
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

    function counter2() {
        let slae = SLAEFactory.createInstance();
        slae.counterAsync2();
    }

    return (
        <div>
            <ButtonsMenu />
            <br></br><br></br>
            <button onClick={echo}>Echo</button>
            <br></br><br></br>
            WebSocket Default
            <br></br>
            <button onClick={counter}>CounterAsync</button>
            <br></br><br></br>
            WebSocket Modified
            <br></br>
            <button onClick={counter2}>CounterAsync2</button>
        </div>      
    )
}

export default ChatPage