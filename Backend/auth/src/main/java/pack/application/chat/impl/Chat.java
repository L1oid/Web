package pack.application.chat.impl;

import pack.application.chat.impl.dto.Message;
import pack.application.chat.api.Chatable;

public class Chat implements Chatable {
    @Override
    public Message getUserMessage(String text, String username) {
        Message message = new Message();
        message.setText(text);
        message.setUsername(username);
        return message;
    }

    @Override
    public Message getHelloMessage(String username) {
        Message message = new Message();
        message.setText("Пользователь подключился к чату: " + username);
        return message;
    }

    @Override
    public Message getGoodbyeMessage(String username) {
        Message message = new Message();
        message.setText("Пользователь покинул чат: " + username);
        return message;
    }
}