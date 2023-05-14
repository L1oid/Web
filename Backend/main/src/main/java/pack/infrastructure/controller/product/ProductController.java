package pack.infrastructure.controller.product;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbException;
import jakarta.inject.Inject;

import java.util.ArrayList;

import pack.infrastructure.builder.Built;
import pack.infrastructure.interceptor.IdRequired;
import pack.application.product.impl.dto.Product;
import pack.application.product.api.Productable;

@Path("/product")
public class ProductController {
    @Context
    ContainerRequestContext requestContext;

    @Inject @Built
    Productable model;

    @GET
    @IdRequired
    @Path("/list")
    @Produces("application/json")
    public Response getProductList(@HeaderParam("User-token") String userToken) {
        Jsonb jsonb = JsonbBuilder.create();
        String resultJSON = jsonb.toJson("undefinedError");
        try {
            resultJSON = jsonb.toJson(model.getProductsList());
            if (resultJSON == null) {
                return Response.status(Response.Status.SERVICE_UNAVAILABLE).entity(jsonb.toJson("Unavailable DataBase Connection")).build();
            } else return Response.ok(resultJSON).build();
        } catch (JsonbException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(jsonb.toJson(e.getMessage())).build();	             
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(jsonb.toJson(e.getMessage())).build();	             
        }
    }

    @GET
    @IdRequired
    @Path("/sorted_list_by_date")
    @Produces("application/json")
    public Response getSortedProductListByDate(@HeaderParam("User-token") String userToken) {
        Jsonb jsonb = JsonbBuilder.create();
        String resultJSON = jsonb.toJson("undefinedError");
        try {
            resultJSON = jsonb.toJson(model.getSortedProductListByDate());
            if (resultJSON == null) {
                return Response.status(Response.Status.SERVICE_UNAVAILABLE).entity(jsonb.toJson("Unavailable DataBase Connection")).build();
            } else return Response.ok(resultJSON).build();
        } catch (JsonbException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(jsonb.toJson(e.getMessage())).build();	             
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(jsonb.toJson(e.getMessage())).build();	             
        }
    }

    @POST
    @IdRequired
    @Path("/add")
    @Consumes("application/json")
    @Produces("application/json")
    public Response addProduct(@HeaderParam("User-token") String userToken, String newProduct) {
        Product product;
        Jsonb jsonb = JsonbBuilder.create();
        String resultJSON = jsonb.toJson("undefinedError");
        try {
            product = jsonb.fromJson(newProduct, new Product(){}.getClass().getGenericSuperclass());
            Boolean status = model.addProduct(product);
            if (status == true) {
                resultJSON = jsonb.toJson("productAdded");
                return Response.ok(resultJSON).build(); 
            } else return Response.status(Response.Status.SERVICE_UNAVAILABLE).entity("Unavailable DataBase Connection").build();
        } catch (JsonbException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
        }    
    }

    @DELETE
    @IdRequired
    @Path("/delete")
    @Produces("application/json")
    public Response deleteProducts(@HeaderParam("User-token") String userToken,@HeaderParam("Delete-row") int toDelete) {
        Jsonb jsonb = JsonbBuilder.create();
        String resultJSON = jsonb.toJson("undefinedError");
        try {
            Boolean status = model.deleteProduct(toDelete);
            if(status == true) {
                resultJSON = jsonb.toJson(status);
                return Response.ok(resultJSON).build();
            } else return Response.status(Response.Status.SERVICE_UNAVAILABLE).entity("Unavailable DataBase Connection").build();
        } catch (JsonbException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
        }    
    }
}