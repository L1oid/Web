package pack.infrastructure.repository.product;

import java.util.List;
import java.util.ArrayList;
import java.util.Date;
import java.text.SimpleDateFormat;

import jakarta.annotation.Resource;
import jakarta.persistence.*;
import jakarta.transaction.*;

import pack.application.product.api.ProductRepositable;
import pack.application.product.impl.dto.Product;

public class ProductRepository implements ProductRepositable {

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
    public String getNearestDate() throws Exception {
        EntityManager entityManager;
        try {
            entityManager = entityManagerFactory.createEntityManager();
        } catch (Exception e) {
		    throw new Exception("Error while Entity Manager initializing: " + e.getMessage()); 
	    }
        try {
            userTransaction.begin();
            entityManager.joinTransaction();
            String date = "Дата отсутствует";
            List<EProduct> eProducts = entityManager.createQuery("SELECT p FROM EProduct p", EProduct.class).getResultList();
            for(EProduct eProduct : eProducts) {
                date = eProduct.getDate();
            }
            userTransaction.commit();
            return date;
        } catch(Exception ex) {
            return null;
        }
    }

    @Override
    public Boolean addProduct(String name, int price, String description, String date) throws Exception {
        EntityManager entityManager;
        try {
            entityManager = entityManagerFactory.createEntityManager();
        } catch (Exception e) {
		    throw new Exception("Error while Entity Manager initializing: " + e.getMessage()); 
	    }
        try {
            userTransaction.begin();
            entityManager.joinTransaction();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-mm-dd");
            Date newDate = format.parse(date);
            EProduct newEProduct = new EProduct(name, price, description, newDate);
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