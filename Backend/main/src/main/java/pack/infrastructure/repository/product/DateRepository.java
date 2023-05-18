package pack.infrastructure.repository.product;

import java.util.List;
import java.util.ArrayList;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.time.LocalDate;

import jakarta.annotation.Resource;
import jakarta.persistence.*;
import jakarta.transaction.*;

import pack.application.product.api.DateRepositable;
import pack.application.product.impl.dto.Product;

public class DateRepository implements DateRepositable {

    @PersistenceUnit(unitName = "test-resource_PersistenceUnit")
    private EntityManagerFactory entityManagerFactory;

    @Override
    public String getDiffDays() throws Exception {
        EntityManager entityManager;
        try {
            entityManager = entityManagerFactory.createEntityManager();
        } catch (Exception e) {
		    throw new Exception("Error while Entity Manager initializing: " + e.getMessage()); 
	    }
        try {
            entityManager.joinTransaction();
            List<EProduct> eProducts = entityManager.createQuery("SELECT p FROM EProduct p ORDER BY p.date ASC", EProduct.class).getResultList();
            String days = "0";
            for(EProduct eProduct : eProducts) {
                String date = eProduct.getDate();
                int status = eProduct.getPrice();
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("MM-dd-yyyy");
                    Date dateEx = sdf.parse(date);
                    Date dateNow = sdf.parse(sdf.format(new Date()));
                    long temp = TimeUnit.DAYS.convert(dateEx.getTime() - dateNow.getTime(), TimeUnit.MILLISECONDS);
                    if (temp > 0 & status != 2) {
                        days = String.valueOf(temp);
                        break;
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            return days;
        } catch(Exception ex) {
            return null;
        }
    }
}