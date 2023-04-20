package pack.controller.path.slae;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.HeaderParam;

import jakarta.inject.Inject;

import pack.model.interfaces.slae.async.ICounterAsync;
import pack.model.interfaces.slae.async.ICounterUpdate;
import pack.model.interfaces.slae.ICounter;
import pack.controller.websocket.Counter;

@Path("counter_async")
public class SLAEController {
    
    @Inject
    private ICounterAsync modelCounter;
    
    @GET
    public Response nextAsync(@HeaderParam("WebSocketID") String wsId) {
        
        ICounterUpdate updater;
        updater = (int value) -> {
            //Counter.sendAll("" + value);
            Counter.send(wsId,"" + value);
        };
                        
        modelCounter.nextAndUpdate(updater);
        String res = "Future..."; 
        
        return Response
                .ok(res)
                .build();
    }
}