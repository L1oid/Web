package Pack.Model.Interfaces;

import java.util.ArrayList;

import Pack.Model.DTO.Product;
import Pack.Model.DTO.User;

public interface IModel {
    void injectRepository(IRepository repository);
    Boolean checkUser(User user) throws Exception;
    //Boolean addUser(User newUser);
    //Integer deleteRow(Integer toDelete);
    //ArrayList<Product> getProductsList();
    //Integer addRow(Product newProduct);
}