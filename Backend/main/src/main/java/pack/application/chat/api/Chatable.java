package pack.application.chat.api;

import pack.application.chat.impl.dto.Message;

public interface Chatable {
    void broadcast(Message message);
}