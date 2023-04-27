package pack.controller.websocket;

import pack.model.interfaces.slae.async.ICounterUpdate2;

public class Updater implements ICounterUpdate2 {
    @Override
    public void update2(int value, String clientID) {
        Counter.send(clientID,"" + value);
    }
}