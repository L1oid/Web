package Pack.Model;

import java.util.ArrayList;

import Pack.Model.DTO.Product;
import Pack.Model.DTO.User;
import Pack.Model.Interfaces.IRepository;
import Pack.Model.Interfaces.IModel;

public class Model implements IModel {

    IRepository repository;

    @Override
    public void injectRepository(IRepository repository) {
        this.repository = repository;
    } 

    @Override
    public Boolean checkUser(User user) throws Exception {
        return repository.checkUser(user.getLogin(), user.getPassword());
    }

    /*
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
    public Integer addRow(Product newProduct) {

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
    public Integer deleteRow(Integer toDelete) {

        FDataBase dbFactory = new FDataBase();
        IDataBase dataBase = dbFactory.initDataBase();
        return dataBase.deleteRows(toDelete);

    }

    @Override
    public ArrayList<Product> getProductsList() {
        FDataBase dbFactory = new FDataBase();
        IDataBase dataBase = dbFactory.initDataBase();
        return GenerateProductList(
            dataBase.selectProducts()
        );
    }*/
}