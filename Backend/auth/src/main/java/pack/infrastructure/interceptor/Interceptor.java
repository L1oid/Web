package pack.infrastructure.interceptor;

import java.io.IOException;

import jakarta.ws.rs.ext.Provider;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.inject.Inject;

import pack.application.auth.token.dto.Token;
import pack.application.auth.service.api.Tokenable;

@Provider
@IdRequired
public class Interceptor implements ContainerRequestFilter {

    @Inject
    Tokenable tokenable;
    
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        String tokenHeaderValue = requestContext.getHeaderString("User-token");
        Jsonb jsonb = JsonbBuilder.create();
        
        if (tokenHeaderValue == null) requestContext.abortWith(
            Response.status(Response.Status.UNAUTHORIZED)
            .type(MediaType.APPLICATION_JSON)
            .entity(jsonb.toJson("Authorization Token Required"))
            .build()
        );

        Token token = jsonb.fromJson(tokenHeaderValue, new Token(){}.getClass().getGenericSuperclass());;
        
        if (!tokenable.verify(token)) requestContext.abortWith(
            Response.status(Response.Status.UNAUTHORIZED)
            .type(MediaType.APPLICATION_JSON)
            .entity(jsonb.toJson("Authorization Token Expired"))
            .build()
        );
    }
}