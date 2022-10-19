package rest;
import jakarta.ws.rs.Path;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;

import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;

import jakarta.ws.rs.QueryParam;

import jakarta.ws.rs.core.Response;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbException;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.processing.Generated;

@Path("/")
public class Service {
  @POST
  @Path("/checkUser")
  @Consumes("application/json")
  @Produces("application/json")
  public Response checkUser(String userJson) {
    User user;
    Jsonb jsonb = JsonbBuilder.create();
    String resultJSON = "undefinedError";
    try{

      try{
        user = jsonb.fromJson(userJson, new User(){}.getClass().getGenericSuperclass());
      }catch (Exception e) {
        resultJSON = "Error while JSON transforming.";
        throw new Exception("Error while JSON transforming.");  
      }

      Boolean usrTrue = null;

      try{

        DataBase.initDataBase();
        usrTrue = DataBase.isUserCorrect(user.getLogin(), user.getPassword());

      }catch (java.sql.SQLException sqle){sqle.printStackTrace();}
      catch (Exception ex){ex.printStackTrace();};
      
      if(usrTrue == true){
        Token token = Token.generateToken(user);
        
        resultJSON = jsonb.toJson(token);
      }else{
        resultJSON = "false";
      }

      

    }catch (JsonbException e) {
      return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
    }
    catch (Exception e) {
      return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
    }    
    return Response.ok(resultJSON).build(); 
  }

  @POST
  @Path("/checkUserToken")
  @Consumes("application/json")
  @Produces("application/json")
  public Response checkUserToken(String tokenJson) {
    Jsonb jsonb = JsonbBuilder.create();
    String resultJSON = "undefinedError";
    Token token;
    try{

      try{
        token = jsonb.fromJson(tokenJson, new Token(){}.getClass().getGenericSuperclass());
      }catch (Exception e) {
        resultJSON = "Error while JSON transforming.";
        throw new Exception("Error while JSON transforming.");  
      }
 
      if(Token.verifyToken(token) == true){
        resultJSON = "true";
      }else{
        resultJSON = "false";
      }

    }catch (JsonbException e) {
      return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
    }
    catch (Exception e) {
      return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
    }    
    return Response.ok(resultJSON).build(); 
  }


  @POST
  @Path("/createUser")
  @Consumes("application/json")
  @Produces("application/json")
  public Response createUser(String User){
    Jsonb jsonb = JsonbBuilder.create();             
    User newUser;
    String resultJSON = "undefinedError";
    try {  
        try { 
          newUser = jsonb.fromJson(User,new User(){}.getClass().getGenericSuperclass());                    
        }
        catch (Exception e) {
          resultJSON = "Error while JSON transforming.";
          throw new Exception("Error while JSON transforming.");  
        }
        try{

          Boolean userCreated = false;
          DataBase.initDataBase();
          userCreated = DataBase.createUser(newUser.getLogin(), newUser.getPassword(), newUser.getEmail());
          if(userCreated == true) resultJSON = "createUser_Ok_status";
          else if (userCreated == false) resultJSON = "userIsExistStatus";
          
        }catch (java.sql.SQLException sqle){resultJSON = "userIsExistStatus";}
        catch (Exception ex){resultJSON ="userIsExistStatus";};
    }
    catch (JsonbException e) {
      return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
    }
    catch (Exception e) {
      return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
    }    
    return Response.ok(jsonb.toJson(resultJSON)).build();  
  }

  @POST
  @Path("/addProduct")
  @Consumes("application/json")
  @Produces("application/json")
  public Response addProduct(String product) {
    Jsonb jsonb = JsonbBuilder.create();
    Product newProduct;
    String resultJSON = "undefinedError";
    try {  
        try {
          newProduct = jsonb.fromJson(product, new Product(){}.getClass().getGenericSuperclass());
        }
        catch (Exception e) {
          resultJSON = "Error while JSON transforming.";
          throw new Exception("Error while JSON transforming.");  
        }
        try{
          DataBase.initDataBase();
          DataBase.addRow(newProduct.getProductName(), newProduct.getPrice(), newProduct.getDescription());
          resultJSON = "addRow_status_ok";
        }catch (java.sql.SQLException sqle){resultJSON = "addRow_status_error";}
        catch (Exception ex){resultJSON ="addRow_status_error";};
    }
    catch (JsonbException e) {
      return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
    }
    catch (Exception e) {
      return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();	             
    }    
    return Response.ok(jsonb.toJson(resultJSON)).build();
  }

  @GET
  @Path("/getProducts")
  @Consumes("application/json")
  @Produces("application/json")
  public Response getProducts() {
    DataBase.initDataBase();
    
  }
}