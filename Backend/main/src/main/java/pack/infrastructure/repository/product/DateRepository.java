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
            String date = "Дата отсутствует";
            List<EProduct> eProducts = entityManager.createQuery("SELECT p FROM EProduct p ORDER BY p.date ASC", EProduct.class).getResultList();
            for(EProduct eProduct : eProducts) {
                date = eProduct.getDate();
                break;
            }
            String days = "0";
            try {
                SimpleDateFormat sdf = new SimpleDateFormat("MM-dd-yyyy");
                Date dateEx = sdf.parse(date);
                Date dateNow = sdf.parse(sdf.format(new Date()));
                days = String.valueOf(TimeUnit.DAYS.convert(Math.abs(dateEx.getTime() - dateNow.getTime()), TimeUnit.MILLISECONDS));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return days;
        } catch(Exception ex) {
            return null;
        }
    }
}