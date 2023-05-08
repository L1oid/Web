import React from "react";

import Chat from "../../component/chat/component";
import ButtonsMenu from "../../component/buttons-menu/component";

function ChatPage(props){
    return (
        <div>
            <ButtonsMenu></ButtonsMenu>
            <Chat></Chat>
        </div>
    )
}

export default ChatPage;