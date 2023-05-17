package pack.application.chat.impl;

import pack.application.chat.impl.dto.Message;
import pack.application.chat.api.Sendable;
import pack.application.chat.api.Chatable;

public class UseSend implements Sendable {

    private Chatable chat;

    @Override
    public void injectChat(Chatable chat) {
        this.chat = chat;
    }

    @Override
    public void broadcast(Message message) {
        chat.broadcast(message);
    }
}