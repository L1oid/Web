package Pack.Model.Interfaces;

import java.util.ArrayList;

import Pack.Model.DTO.Product;

public interface IProductModel {
    void injectRepository(IProductRepository repository);
    ArrayList<Product> getProductsList() throws Exception;
    Boolean addProduct(Product product) throws Exception;
    Boolean deleteProduct(int toDelete) throws Exception;
}