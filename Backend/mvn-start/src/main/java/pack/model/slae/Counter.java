package pack.model.slae;

import pack.model.interfaces.slae.ICounter;
import pack.model.interfaces.slae.async.ICounterAsync;
import pack.model.interfaces.slae.async.ICounterUpdate;

import jakarta.ejb.Singleton;
import jakarta.ejb.Startup;
import jakarta.ejb.Asynchronous;
import jakarta.annotation.PostConstruct;

@Startup 
@Singleton
public class Counter implements ICounter, ICounterAsync {
    private int counter;  
  
    @PostConstruct    
    public void start() {
        counter = 0; 
    }

    @Override
    public int next() {  
        try {
            Thread.sleep(2000);
        }
        catch(InterruptedException e) {}
        counter++;
        return counter;
    }

    @Override   
    public String nextAsync(ICounterUpdate updater) {
        nextAndUpdate(updater);               
        return "ID";
    }
  
    @Asynchronous
    @Override
    public void nextAndUpdate(ICounterUpdate updater) {      
        try {
            Thread.sleep(2000);
        }
        catch(InterruptedException e) {}
        updater.update(next());
    }  
}