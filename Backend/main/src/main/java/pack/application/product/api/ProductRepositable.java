package pack.application.product.api;

import java.util.ArrayList;
import java.util.Date;

import pack.application.product.impl.dto.Product;

public interface ProductRepositable {
    ArrayList<Product> getProductsList() throws Exception;
    Boolean addProduct(String name, int price, String description, String date) throws Exception;
    Boolean deleteProduct(int toDelete) throws Exception;
    String getNearestDate() throws Exception;
}