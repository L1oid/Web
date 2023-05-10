package pack.infrastructure.builder.counter;

import jakarta.inject.Inject;
import jakarta.enterprise.inject.Produces;
import jakarta.enterprise.inject.Default;

import pack.infrastructure.builder.Built;
import pack.application.counter.api.Countable;
import pack.application.counter.api.Executable;
import pack.application.counter.api.Storable;
import pack.application.counter.api.Updatable;
import pack.application.counter.api.Interconnectable;

public class CounterBuilder {
    @Inject @Default
    private Countable app;
    
    @Inject @Default
    private Executable executor;

    @Inject @Default
    private Storable store;
    
    @Inject @Default
    private Updatable updater;

    @Inject @Default
    private Interconnectable interconnector;

    @Produces @Built
    Countable build() {
        app.assignExecutor(executor);        
        app.assignStore(store);        
        app.assignUpdater(updater);
        app.assignInterconnector(interconnector);               
        return app;
    }
}