package pack.infrastructure.controller.counter;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.HeaderParam;
import jakarta.inject.Inject;

import pack.infrastructure.builder.Built;
import pack.application.counter.api.Countable;

@Path("/counter")
public class Counter {
    
    @Inject @Built
    private Countable app;
    
    @GET
    public Response next(@HeaderParam("ClientID") String clientId) {
        boolean flag = app.next(clientId);
        
        String res = "OK: Result will be got later..."; 
        if (!flag) {
           res = "Error: Result can not be got...";  
        }

        return Response
                .ok(res)
                .build();
    }
}