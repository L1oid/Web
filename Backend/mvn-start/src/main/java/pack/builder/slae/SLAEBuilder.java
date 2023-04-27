package pack.builder.slae;

import pack.builder.Built;

import jakarta.inject.Inject;
import jakarta.enterprise.inject.Produces;
import jakarta.enterprise.inject.Default;

import pack.model.interfaces.slae.async.ICounterAsync2;
import pack.model.interfaces.slae.async.ICounterUpdate2;

public class SLAEBuilder {
    @Inject @Default
    private ICounterAsync2 model;
    
    @Inject @Default
    private ICounterUpdate2 updater;
    
    @Produces @Built
    public ICounterAsync2 buildModel() {
        model.assignUpdater(updater);        
        return model;
    }
}