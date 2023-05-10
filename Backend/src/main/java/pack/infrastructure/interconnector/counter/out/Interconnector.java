package pack.infrastructure.interconnector.counter.out;

import jakarta.annotation.Resource;
import jakarta.jms.ConnectionFactory;
import jakarta.jms.JMSContext;
import jakarta.jms.JMSProducer;
import jakarta.jms.Queue; 

import pack.application.counter.api.Interconnectable;

public class Interconnector implements Interconnectable {
    @Resource(mappedName = "jms/CounterFactory")    
    private ConnectionFactory connectionFactory;
        
    @Resource(mappedName = "jms/CounterQueue")
    private Queue queue;    

    @Override
    public void info(double value) {
        try {
            JMSContext context = connectionFactory.createContext();
            JMSProducer producer = context.createProducer();                
            producer.send(queue,String.valueOf(value));
        } catch (Exception e) {}   
    }
}