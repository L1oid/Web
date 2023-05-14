package pack.infrastructure.builder.product;

import pack.infrastructure.builder.Built;
import pack.application.product.api.Productable;
import pack.application.product.api.ProductRepositable;

import jakarta.inject.Inject;
import jakarta.enterprise.inject.Produces;
import jakarta.enterprise.inject.Default;

public class ProductBuilder { 

    @Inject @Default
    private Productable model;

    @Inject @Default
    private ProductRepositable repository;

    @Produces @Built
    public Productable buildModel() {
	   model.injectRepository(repository);
       return model;
    }
}