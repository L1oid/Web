package pack.repository.user;

import java.util.List;
import java.util.ArrayList;

import jakarta.annotation.Resource;
import jakarta.persistence.*;
import jakarta.transaction.*;

import pack.model.interfaces.user.IUserRepository;
import pack.model.dto.User;

public class UserRepository implements IUserRepository {

    @PersistenceUnit(unitName = "test-resource_PersistenceUnit")
    private EntityManagerFactory entityManagerFactory;
   
    @Resource
    private UserTransaction userTransaction;

    @Override
    public Boolean checkUser(String login, String password) throws Exception {
        EntityManager entityManager;
        Boolean status = null;
        try {
            entityManager = entityManagerFactory.createEntityManager();
        } catch (Exception e) {
		    throw new Exception("Error while Entity Manager initializing: " + e.getMessage()); 
	    }	
        try {
            userTransaction.begin();
            entityManager.joinTransaction();

            List<EUser> user = entityManager.createQuery("SELECT p FROM EUser p WHERE p.login = ?1", EUser.class).setParameter(1, login).getResultList();

            if (user.size() == 1) {
                if (user.get(0).getPassword().equals(password)) {
                    status = true;
                } else status = false;
            } else status = false;
            userTransaction.commit();
            return status;
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public Boolean addUser(String login, String password, String email) throws Exception {
        EntityManager entityManager;
        Boolean status = null;
        try {
            entityManager = entityManagerFactory.createEntityManager();
        } catch (Exception e) {
		    throw new Exception("Error while Entity Manager initializing: " + e.getMessage()); 
	    }	
        try {
            userTransaction.begin();
            entityManager.joinTransaction();

            EUser newUser = new EUser(login, password, email);

            if (newUser.getLogin() != null) {
                entityManager.persist(newUser);
                status = true;
            } else status = false;
            userTransaction.commit();
            return status;
        } catch (Exception ex) {
            if (ex.getCause().getCause().getCause() instanceof java.sql.SQLIntegrityConstraintViolationException) {
                return false;
            } else return null;
        }
    }
}