package pack.infrastructure.builder.user;

import pack.infrastructure.builder.Built;
import pack.application.auth.service.api.Authorizable;
import pack.application.auth.service.api.UserRepositable;

import jakarta.inject.Inject;
import jakarta.enterprise.inject.Produces;
import jakarta.enterprise.inject.Default;

public class UserBuilder { 

    @Inject @Default
    private Authorizable model;

    @Inject @Default
    private UserRepositable repository;

    @Produces @Built
    public Authorizable buildModel() {
	   model.injectRepository(repository);
       return model;
    } 
}