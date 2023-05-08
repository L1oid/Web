package pack.application.product.impl;

import java.util.ArrayList;

import pack.application.product.impl.dto.Product;
import pack.application.product.api.Productable;
import pack.application.product.api.ProductRepositable;

public class UseProduct implements Productable {

    ProductRepositable repository;

    @Override
    public void injectRepository(ProductRepositable repository) {
        this.repository = repository;
    } 

    @Override
    public ArrayList<Product> getProductsList() throws Exception {
        return repository.getProductsList();
    }

    @Override
    public Boolean addProduct(Product product) throws Exception {
        return repository.addProduct(product.getName(), product.getPrice(), product.getDescription());
    }

    @Override
    public Boolean deleteProduct(int toDelete) throws Exception {
        return repository.deleteProduct(toDelete);
    }
}