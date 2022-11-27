package Pack.Builder;

import Pack.Model.Interfaces.IUserModel;
import Pack.Model.Interfaces.IUserRepository;

import jakarta.inject.Inject;
import jakarta.enterprise.inject.Produces;
import jakarta.enterprise.inject.Default;

public class UserBuilder { 

    @Inject @Default
    private IUserModel model;

    @Inject @Default
    private IUserRepository repository;

    @Produces @Built
    public IUserModel buildModel() {
	   model.injectRepository(repository);
       return model;
    } 
}