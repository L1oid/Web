package rest.Model;

import java.util.ArrayList;

import rest.Model.DTO.Product;
import rest.Model.DTO.User;

public interface IModel {
    Boolean checkUser(User user) throws Exception;
    Boolean addUser(User newUser);
    Integer deleteRows(Integer toDelete);
    ArrayList<Product> getProductsList();
    Integer addRow(Product newProduct);
}
