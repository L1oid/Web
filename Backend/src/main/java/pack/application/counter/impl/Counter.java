package pack.application.counter.impl;

import pack.application.counter.api.Countable;
import pack.application.counter.api.Executable;
import pack.application.counter.api.Storable;
import pack.application.counter.api.Updatable;
import pack.application.counter.api.Interconnectable;

import pack.domain.counter.api.Sumable;
import pack.domain.counter.Factory;

public class Counter implements Countable {
    private Executable executor;
    private Storable store;
    private Updatable updater;
    private Interconnectable interconnector;
  
    @Override
    public void assignExecutor(Executable executor) {
        this.executor = executor;  
    }

    @Override
    public void assignStore(Storable store) {
        this.store = store;  
    }

    @Override
    public void assignUpdater(Updatable updater) {
        this.updater = updater;  
    }

    @Override
    public void assignInterconnector(Interconnectable interconnector) {
        this.interconnector = interconnector;  
    }


    @Override
    public boolean next(String clientID) {  
        executor.execute( ()-> {
            try {
                Thread.sleep(2000);
            } catch (Exception e) {}  
       
            double cur = store.retrive(); 
            Sumable s = Factory.createSummator();
            double res = s.sum(cur,1);
            store.save(res);
            updater.update(res,clientID);
            interconnector.info(res); 
        });     
        return true;
    }

    @Override
    public boolean info(double value) {  
        executor.execute( ()-> {
            try {
                Thread.sleep(3000);
            } catch (Exception e) {}  

            updater.update(value,null);
        });     
        return true;
    }
}