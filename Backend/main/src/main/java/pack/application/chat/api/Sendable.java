package pack.application.chat.api;

import pack.application.chat.impl.dto.Message;

public interface Sendable {
    void injectChat(Chatable chat);
    void broadcast(Message message);
}