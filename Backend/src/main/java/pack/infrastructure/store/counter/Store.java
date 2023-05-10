package pack.infrastructure.store.counter;

import pack.application.counter.api.Storable;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.annotation.PostConstruct;

@ApplicationScoped
public class Store implements Storable {
    private double value;  
    
    @PostConstruct    
    public void start() {
        value = 0;     
    }
  
    @Override
    public void save(double value) {      
        this.value = value;
    }

    @Override
    public double retrive() {      
        return this.value;
    }      
}