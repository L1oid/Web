package pack.controller.websocket;

import jakarta.ejb.Stateless;
import jakarta.ejb.Schedule;

@Stateless
public class TimerDecl {
    @Schedule(second="*/30", minute="*", hour="*")
    public void execute() {
        Counter.sendAll("Hello from declaring timer!");
    } 
}