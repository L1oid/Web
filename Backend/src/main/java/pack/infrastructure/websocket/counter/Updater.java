package pack.infrastructure.websocket.counter;

import pack.application.counter.api.Updatable;

public class Updater implements Updatable {
    @Override
    public void update(double value, String clientID) {
        if (clientID == null) {
          Counter.sendAll("To all: " + value);
        }
        else {
          Counter.send(clientID,"To client: " + value);
        }  
    }
}