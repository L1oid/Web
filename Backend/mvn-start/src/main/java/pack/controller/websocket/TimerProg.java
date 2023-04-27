package pack.controller.websocket;

import jakarta.ejb.Singleton;
import jakarta.ejb.Startup;
import jakarta.ejb.TimerService;
import jakarta.ejb.TimerConfig;
import jakarta.ejb.Timeout;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;

import java.util.Date;


@Singleton
@Startup
public class TimerProg {
    @Resource
    TimerService tservice; 
    
    @PostConstruct    
    public void start() {
        tservice.createIntervalTimer(new Date(), 20000, new TimerConfig()); 
    } 
  
    @Timeout
    public void timeout() {
        Counter.sendAll("Hello from programming timer!"); 
    }
}