package Pack.Repository.User;

import java.util.List;
import java.util.ArrayList;

import jakarta.annotation.Resource;
import jakarta.persistence.*;
import jakarta.transaction.*;

import Pack.Model.Interfaces.IRepository;

public class UserRepository implements IRepository {

    @PersistenceUnit(unitName = "test-resource_PersistenceUnit")
    private EntityManagerFactory entityManagerFactory;
   
    @Resource
    private UserTransaction userTransaction;

    @Override
    public Boolean checkUser(String login, String password) throws Exception {
        EntityManager entityManager;
        Boolean status;
        try {
            entityManager = entityManagerFactory.createEntityManager();
        } catch (Exception e) {
		    throw new Exception("Error while Entity Manager initializing: " + e.getMessage()); 
	    }	
        try {
            userTransaction.begin();
            entityManager.joinTransaction();

            List<EUser> user = entityManager.createQuery("SELECT p FROM EUser p WHERE p.login = ?1", EUser.class).setParameter(1, login).getResultList();

            if(user.size() == 1) {
                if(user.get(0).getPassword().equals(password)) {
                    status = true;
                } else status = false;
            } else status = false;
            userTransaction.commit();
            return status;
        } catch (Exception e) {
            throw new Exception("Error while JPA operating: " + e.getMessage());
        }
    }
}