package pack.infrastructure.websocket.chat;

import java.io.IOException;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import jakarta.inject.Inject;
import jakarta.websocket.EncodeException;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

import pack.application.chat.api.Chatable;
import pack.application.chat.impl.dto.Message;

@ServerEndpoint(value = "/chat/{username}", decoders = MessageDecoder.class, encoders = MessageEncoder.class)
public class Chat {
    private Session session;
    private static Set<Chat> chatServices = new CopyOnWriteArraySet<>();
    private static HashMap<String, String> users = new HashMap<>();
 
    @Inject
    Chatable chat;

    @OnOpen
    public void onOpen(Session session, @PathParam("username") String username) throws IOException, EncodeException{
        this.session = session;
        chatServices.add(this);
        users.put(session.getId(), username);
        Message message = chat.getHelloMessage(username);
        broadcast(message);
    }

    @OnMessage
    public void onMessage(Session session, Message message) throws IOException, EncodeException{
        Message newMessage = chat.getUserMessage(message.getText(), users.get(session.getId()));
        broadcast(newMessage);
    }

    @OnClose
    public void onClose(Session session){
        chatServices.remove(this);
        Message message = chat.getGoodbyeMessage(users.get(session.getId()));
        broadcast(message);
    }   

    public static void broadcast(Message message){
        chatServices.forEach(chat -> {
            synchronized (chat) {
                try {
                    chat.session.getBasicRemote().sendObject(message);
                } catch (IOException | EncodeException e) {
                    e.printStackTrace();
                }
            }
        });
    }
}