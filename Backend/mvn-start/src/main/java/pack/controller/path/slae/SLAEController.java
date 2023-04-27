package pack.controller.path.slae;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.HeaderParam;

import jakarta.inject.Inject;

import pack.builder.Built;
import pack.model.interfaces.slae.async.ICounterAsync;
import pack.model.interfaces.slae.async.ICounterAsync2;
import pack.model.interfaces.slae.async.ICounterUpdate;
import pack.model.interfaces.slae.ICounter;
import pack.controller.websocket.Counter;

@Path("/slae")
public class SLAEController {
    
    @Inject
    private ICounterAsync modelCounter;

    @Inject @Built
    private ICounterAsync2 modelCounter2;
    
    @GET
    @Path("/counter_async")
    public Response nextAsync(@HeaderParam("WebSocketID") String wsId) {
        
        ICounterUpdate updater;
        updater = (int value) -> {
            Counter.send(wsId,"" + value);
        };
                        
        modelCounter.nextAndUpdate(updater);
        String res = "Future..."; 
        
        return Response
                .ok(res)
                .build();
    }

    @GET
    @Path("/counter_async2")
    public Response nextAsync2(@HeaderParam("WebSocketID") String wsId) {
        modelCounter2.nextAsync2(wsId);
        String res = "Result will be got by websocket..."; 
        
        return Response
                .ok(res)
                .build();
    }
}