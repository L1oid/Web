package pack.infrastructure.interconnector.counter.in;

import jakarta.ejb.MessageDriven;
import jakarta.jms.MessageListener;
import jakarta.jms.Message;
import jakarta.jms.TextMessage;
import jakarta.jms.JMSException;
import jakarta.inject.Inject;

import pack.infrastructure.builder.Built;
import pack.application.counter.api.Countable;

@MessageDriven(mappedName = "jms/CounterQueue")
public class Interconnector implements MessageListener {
    @Inject @Built
    private Countable app;
   
    @Override
    public void onMessage(Message message) {
        TextMessage textMessage = (TextMessage)message;
        try {
            String text = textMessage.getText();
            app.info(Double.parseDouble(text));
        } catch (JMSException e) {}         
    } 
}