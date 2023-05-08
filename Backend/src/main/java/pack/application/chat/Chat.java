package pack.application.chat;

import pack.application.chat.dto.Message;

public class Chat implements IChat {
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