package rest.DataBase;

import java.util.ArrayList;

public interface IDataBase {
    Boolean createUser(String login, String password, String email);
    Integer addRow(String name, int price, String description);
    Integer deleteRows(Integer to_delete);
    ArrayList<ArrayList<String>> selectProducts();
}
