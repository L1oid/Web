package pack.infrastructure.builder.product;

import pack.infrastructure.builder.Built;
import pack.application.product.api.Dateable;
import pack.application.product.api.DateRepositable;

import jakarta.inject.Inject;
import jakarta.enterprise.inject.Produces;
import jakarta.enterprise.inject.Default;

public class DateBuilder { 

    @Inject @Default
    private Dateable model;

    @Inject @Default
    private DateRepositable repository;

    @Produces @Built
    public Dateable buildModel() {
	   model.injectRepository(repository);
       return model;
    }
}