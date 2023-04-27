package pack.model.slae;

import pack.model.interfaces.slae.async.ICounterAsync2;
import pack.model.interfaces.slae.async.ICounterUpdate2;

import jakarta.enterprise.context.ApplicationScoped;

import jakarta.annotation.Resource;
import jakarta.annotation.PostConstruct;

import jakarta.enterprise.concurrent.ManagedExecutorService;

@ApplicationScoped
public class Counter2 implements ICounterAsync2 {
    private int counter;  
    private ICounterUpdate2 updater;
  
    @Resource
    private ManagedExecutorService mes;

    @PostConstruct    
    public void start() {
        counter = 10;
        updater = null;
    }

    @Override
    public void assignUpdater(ICounterUpdate2 updater) {
        this.updater = updater;  
    }

    @Override
    public void nextAsync2(String clientID) {      
      
        mes.execute( ()-> {
            try {
                Thread.sleep(2000);
            }
            catch(InterruptedException e) {}
      
            counter++;
            updater.update2(counter,clientID);
        });   
    }  
}