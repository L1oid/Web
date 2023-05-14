package pack.infrastructure.schedule;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import jakarta.ejb.Stateless;
import jakarta.ejb.Schedule;
import jakarta.ejb.Singleton;
import jakarta.ejb.Startup;
import jakarta.ejb.Timeout;
import jakarta.ejb.TimerConfig;
import jakarta.ejb.TimerService;
import jakarta.enterprise.concurrent.ManagedExecutorService;
import jakarta.inject.Inject;

import pack.application.chat.api.Chatable;
import pack.application.product.api.Dateable;
import pack.infrastructure.builder.Built;
import pack.infrastructure.websocket.chat.Chat;

@Singleton
@Startup
public class Timer {
    
    @Inject
    Chatable chat;

    @Inject @Built
    Dateable model;

    @Resource
    TimerService tservice; 
    
    @PostConstruct    
    public void start() {
        tservice.createIntervalTimer(new Date(), 30000, new TimerConfig()); 
    }

    @Timeout
    public void timeout() {
        try {
            String date = model.getDiffDays();
            Chat.broadcast(chat.getUserMessage("Дней до ближайшего дедлайна: " + date, "Система")); 
        } catch (Exception ex) {}
    } 
}