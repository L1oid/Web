package pack.controller.websocket;

import java.io.IOException;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint("/echo")
public class Echo {
    @OnOpen
    public void connectionOpened() {

    }
    
    @OnClose
    public void connectionClosed() {

    }
    
    @OnMessage
    public synchronized void processMessage(Session session, String message) {
        try { 
            for (Session sess : session.getOpenSessions()) {
                if (sess.isOpen()) {
                    sess.getBasicRemote().sendText(message + "OK");
                }
            }
        }
        catch (IOException ioe) {

        }        
    } 
}