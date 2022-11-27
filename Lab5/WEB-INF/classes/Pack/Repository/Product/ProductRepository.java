package Pack.Repository.Product;

import java.util.List;
import java.util.ArrayList;

import jakarta.annotation.Resource;
import jakarta.persistence.*;
import jakarta.transaction.*;

import Pack.Model.Interfaces.IProductRepository;
import Pack.Model.DTO.Product;

public class ProductRepository implements IProductRepository {

    @PersistenceUnit(unitName = "test-resource_PersistenceUnit")
    private EntityManagerFactory entityManagerFactory;
   
    @Resource
    private UserTransaction userTransaction;

    @Override
    public ArrayList<Product> getProductsList() throws Exception {
        EntityManager entityManager;
        try {
            entityManager = entityManagerFactory.createEntityManager();
        } catch (Exception e) {
		    throw new Exception("Error while Entity Manager initializing: " + e.getMessage()); 
	    }
        try {
            userTransaction.begin();
            entityManager.joinTransaction();

            ArrayList<Product> productList = new ArrayList<>();
            List<EProduct> eProducts = entityManager.createQuery("SELECT p FROM EProduct p", EProduct.class).getResultList();

            for(EProduct eProduct : eProducts) {
                productList.add(eProduct.convert());
            }

            userTransaction.commit();
            return productList;
        } catch(Exception ex) {
            return null;
        }
    }

    @Override
    public Boolean addProduct(String name, int price, String description) throws Exception {
        EntityManager entityManager;
        try {
            entityManager = entityManagerFactory.createEntityManager();
        } catch (Exception e) {
		    throw new Exception("Error while Entity Manager initializing: " + e.getMessage()); 
	    }
        try{
            userTransaction.begin();
            entityManager.joinTransaction();

            EProduct newEProduct = new EProduct(name, price, description);

            entityManager.persist(newEProduct);

            userTransaction.commit();
            return true;
        } catch(Exception ex) {
            return null;
        }
    }

    @Override
    public Boolean deleteProduct(int toDelete) throws Exception {
        EntityManager entityManager;
        try {
            entityManager = entityManagerFactory.createEntityManager();
        } catch (Exception e) {
		    throw new Exception("Error while Entity Manager initializing: " + e.getMessage()); 
	    }
        try{
            userTransaction.begin();
            entityManager.joinTransaction();

            entityManager.createQuery("DELETE FROM EProduct p WHERE p.id = " + Integer.toString(toDelete), EProduct.class).executeUpdate();

            userTransaction.commit();
            return true;
        }
        catch(Exception ex) {
            return null;
        }

    }
}