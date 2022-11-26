package Pack.Builder;

import Pack.Model.Interfaces.IModel;
import Pack.Model.Interfaces.IRepository;

import jakarta.inject.Inject;
import jakarta.enterprise.inject.Produces;
import jakarta.enterprise.inject.Default;


public class Builder { 

    @Inject @Default
    private IModel model;

    @Inject @Default
    private IRepository repository;

    @Produces @Built
    public IModel buildModel() {
	   model.injectRepository(repository);
       return model;
    } 
}