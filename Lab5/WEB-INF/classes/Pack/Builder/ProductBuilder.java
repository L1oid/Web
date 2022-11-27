package Pack.Builder;

import Pack.Model.Interfaces.IProductModel;
import Pack.Model.Interfaces.IProductRepository;

import jakarta.inject.Inject;
import jakarta.enterprise.inject.Produces;
import jakarta.enterprise.inject.Default;

public class ProductBuilder { 

    @Inject @Default
    private IProductModel model;

    @Inject @Default
    private IProductRepository repository;

    @Produces @Built
    public IProductModel buildModel() {
	   model.injectRepository(repository);
       return model;
    } 
}