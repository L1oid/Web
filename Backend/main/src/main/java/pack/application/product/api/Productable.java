package pack.application.product.api;

import java.util.ArrayList;

import pack.application.product.impl.dto.Product;

public interface Productable {
    void injectRepository(ProductRepositable repository);
    ArrayList<Product> getProductsList() throws Exception;
    Boolean addProduct(Product product) throws Exception;
    Boolean deleteProduct(int toDelete) throws Exception;
    String getNearestDate() throws Exception;
}