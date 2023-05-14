package pack.application.product.api;

import java.util.ArrayList;

import pack.application.product.impl.dto.Product;

public interface Dateable {
    void injectRepository(DateRepositable repository);
    String getDiffDays() throws Exception;
}