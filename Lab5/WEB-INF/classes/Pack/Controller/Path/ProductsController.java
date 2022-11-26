package Pack.Controller.Path;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.core.Response;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbException;
import jakarta.inject.Inject;

import java.util.ArrayList;

import Pack.Builder.Built;
import Pack.Model.DTO.Product;
import Pack.Model.Interfaces.IModel;
import Pack.Controller.DTO.Token;
import Pack.Controller.Tools.TokenTools;

@Path("/products")
public class ProductsController {
    @Inject @Built
    IModel model;

    /*
    @GET
    @Path("/list")
    @Produces("application/json")
    public Response getProductList(@HeaderParam("User-token") String userToken) {
        Token token;
        Jsonb jsonb = JsonbBuilder.create();
        String resultJSON = jsonb.toJson("undefinedError");
        try {
            token = jsonb.fromJson(userToken, new Token(){}.getClass().getGenericSuperclass());
            if (TokenTools.verifyToken(token)) {
                resultJSON = jsonb.toJson(model.getProductsList());
                if (resultJSON == null) {
                    return Response.status(Response.Status.SERVICE_UNAVAILABLE).entity(jsonb.toJson("Unavailable DataBase Connection")).build();
                } else {
                    return Response.ok(resultJSON).build(); 
                }
            } else return Response.status(Response.Status.UNAUTHORIZED).entity(jsonb.toJson("ExpiredToken")).build();
        } catch (JsonbException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(jsonb.toJson(e.getMessage())).build();	             
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(jsonb.toJson(e.getMessage())).build();	             
        } 
    }

    @POST
    @Path("/add")
    @Consumes("application/json")
    @Produces("application/json")
    public Response addProduct(@HeaderParam("User-token") String userToken, String newProduct) {
        Token token;
        Product product;
        Jsonb jsonb = JsonbBuilder.create();
        String resultJSON = jsonb.toJson("undefinedError");
        try {
            token = jsonb.fromJson(userToken, new Token(){}.getClass().getGenericSuperclass());
            product = jsonb.fromJson(newProduct, new Product(){}.getClass().getGenericSuperclass());
            if (TokenTools.verifyToken(token)) {
                int row = model.addRow(product);
                if (row == 1) {
                    resultJSON = jsonb.toJson("rowAdded");
                    return Response.ok(resultJSON).build(); 
                } else return Response.status(Response.Status.SERVICE_UNAVAILABLE).entity("Unavailable DataBase Connection").build();
            } else return Response.status(Response.Status.UNAUTHORIZED).entity("ExpiredToken").build();
        } catch (JsonbException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
        }    
    }

    @DELETE
    @Path("/delete")
    @Produces("application/json")
    public Response deleteProducts(@HeaderParam("User-token") String userToken,@HeaderParam("Delete-row") int toDelete) {
        Token token;
        Jsonb jsonb = JsonbBuilder.create();
        String resultJSON = jsonb.toJson("undefinedError");
        try {
            token = jsonb.fromJson(userToken, new Token(){}.getClass().getGenericSuperclass());
            if (TokenTools.verifyToken(token)) {
                int row = model.deleteRow(toDelete);
                if(row == null) {
                    return Response.status(Response.Status.SERVICE_UNAVAILABLE).entity("Unavailable DataBase Connection").build();
                } else if(row == 0) {
                    return Response.status(Response.Status.NO_CONTENT).entity("Nothing Deleted").build();
                } else {
                    resultJSON = jsonb.toJson(row);
                    return Response.ok(resultJSON).build(); 
                }
            } else return Response.status(Response.Status.UNAUTHORIZED).entity("ExpiredToken").build();
        } catch (JsonbException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
        }    
    }*/
}