package rest.Controller;

import jakarta.ws.rs.Path;

import jakarta.ws.rs.POST;

import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;

import jakarta.ws.rs.core.Response;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbException;

import rest.Model.DTO.User;
import rest.Model.IModel;
import jakarta.inject.Inject;

@Path("/users")
public class ServiceUser {
    @Inject
    IModel model;

    @POST
    @Path("/auth")
    @Consumes("application/json")
    @Produces("application/json")
    public Response authUser(String userJson) {
        User user;
        Jsonb jsonb = JsonbBuilder.create();

        try {
            user = jsonb.fromJson(userJson, new User(){}.getClass().getGenericSuperclass());
            Boolean usrTrue = model.checkUser(user);

            if (usrTrue == null) {
                return Response.status(Response.Status.SERVICE_UNAVAILABLE).entity(jsonb.toJson("Unavailable DataBase Connection")).build();
            }
            if (usrTrue == true) {
                Token token = TokenTools.generateToken(TokenTools.generatePayload(user.getLogin(), user.getEmail()));
                return Response.ok(jsonb.toJson(token)).build();
            } else {
                return Response.status(Response.Status.UNAUTHORIZED).entity(jsonb.toJson("UserNotFound")).build();
            }
        } catch (JsonbException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(jsonb.toJson(e.getMessage())).build();	             
        }
        catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(jsonb.toJson(e.getMessage())).build();	             
        }    
    }
    

    @POST
    @Path("/register")
    @Consumes("application/json")
    @Produces("application/json")
    public Response createUser(String User) {
        Jsonb jsonb = JsonbBuilder.create();             
        User newUser;

        try {  
            newUser = jsonb.fromJson(User,new User(){}.getClass().getGenericSuperclass());    
            Boolean userCreated = model.addUser(newUser);

            if (userCreated == null) {
                return Response.status(Response.Status.SERVICE_UNAVAILABLE).entity(jsonb.toJson("Unavailable DataBase Connection")).build();
            }
            if (userCreated == false) {
                return Response.status(Response.Status.UNAUTHORIZED).entity(jsonb.toJson("UserAlreadyExist")).build();
            }
            else {
                return Response.ok(jsonb.toJson("userCreated")).build(); 
            }
        }
        catch (JsonbException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(jsonb.toJson(e.getMessage())).build();	             
        }
        catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(jsonb.toJson(e.getMessage())).build();	             
        }    
    }
}
