package rest.Model;

import jakarta.inject.Inject;

import java.util.ArrayList;

import rest.DataBase.FDataBase;
import rest.DataBase.IDataBase;
import rest.Model.DTO.Product;
import rest.Model.DTO.User;
import rest.Model.DataSource.User.IUserDataSource;

public class Model implements IModel{

    @Inject
    IUserDataSource datasource;

    public ArrayList<Product> GenerateProductList(ArrayList<ArrayList<String>> products){
           
        ArrayList<Product> productList = new ArrayList<>();

        for(ArrayList<String> product: products){
            Product newProduct = new Product();
            newProduct.setId(Integer.parseInt(product.get(0))); 
            newProduct.setName(product.get(1)); 
            newProduct.setPrice(Integer.parseInt(product.get(2))); 
            newProduct.setDescription(product.get(3)); 

            productList.add(newProduct);
        }

        return productList;
    }

    @Override
    public Integer addRow(Product newProduct){

        FDataBase dbFactory = new FDataBase();
        IDataBase dataBase = dbFactory.initDataBase();

        int row = dataBase.addRow(
            newProduct.getName(),
            newProduct.getPrice(),
            newProduct.getDescription()
        );

        return row;
    };

    @Override
    public Boolean checkUser(User user) throws Exception {
        return datasource.checkUser(user.getLogin(), user.getPassword());
    }

    @Override
    public Boolean addUser(User newUser){

        FDataBase dbFactory = new FDataBase();
        IDataBase dataBase = dbFactory.initDataBase();
        return dataBase.createUser(
            newUser.getLogin(), 
            newUser.getPassword(), 
            newUser.getEmail()
        );

    }

    @Override
    public Integer deleteRows(Integer toDelete){

        FDataBase dbFactory = new FDataBase();
        IDataBase dataBase = dbFactory.initDataBase();
        return dataBase.deleteRows(toDelete);

    }

    @Override
    public ArrayList<Product> getProductsList(){
        FDataBase dbFactory = new FDataBase();
        IDataBase dataBase = dbFactory.initDataBase();
        return GenerateProductList(
            dataBase.selectProducts()
        );
    }

}
