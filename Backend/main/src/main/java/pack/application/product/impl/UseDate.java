package pack.application.product.impl;

import java.util.ArrayList;

import pack.application.product.impl.dto.Product;
import pack.application.product.api.Dateable;
import pack.application.product.api.DateRepositable;

public class UseDate implements Dateable {

    DateRepositable repository;

    @Override
    public void injectRepository(DateRepositable repository) {
        this.repository = repository;
    } 

    @Override
    public String getDiffDays() throws Exception {
        return repository.getDiffDays();
    }
}