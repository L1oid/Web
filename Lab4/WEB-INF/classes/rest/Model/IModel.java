package rest.Model;

import java.util.ArrayList;

public interface IModel {
    Boolean checkUser(User user);
    Boolean addUser(User newUser);
    Integer deleteRows(Integer toDelete);
    ArrayList<Product> getProductsList();
    Integer addRow(Product newProduct);
}
