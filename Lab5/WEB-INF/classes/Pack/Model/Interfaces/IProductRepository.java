package Pack.Model.Interfaces;

import java.util.ArrayList;

import Pack.Model.DTO.Product;

public interface IProductRepository {
    ArrayList<Product> getProductsList() throws Exception;
    Boolean addProduct(String name, int price, String description) throws Exception;
    Boolean deleteProduct(int toDelete) throws Exception;
}