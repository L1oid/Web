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

import pack.application.chat.api.Sendable;
import pack.application.chat.api.MessageSendable;
import pack.application.product.api.Dateable;
import pack.infrastructure.builder.Built;

@Singleton
@Startup
public class Timer {
    
    @Inject @Built
    Sendable send;

    @Inject @Built
    Dateable model;

    @Inject
    MessageSendable messageSend;

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
            send.broadcast(messageSend.getUserMessage("Дней до ближайшего дедлайна: " + date, "Система")); 
        } catch (Exception ex) {}
    } 
}