package pack.application.chat;

import pack.application.chat.dto.Message;

public interface IChat {
    Message getUserMessage(String text, String username);
    Message getHelloMessage(String username);
    Message getGoodbyeMessage(String username);
}