package pack.infrastructure.repository.product;

import java.io.Serializable;
import java.text.DateFormat;  
import java.text.SimpleDateFormat;  
import java.util.Date;  
import java.util.Calendar;  

import jakarta.persistence.*;

import pack.application.product.impl.dto.Product;

@Entity
@Table(name = "\"products\"")
public class EProduct  implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "\"id\"")
    private int id;

    @Column(name = "\"ProductName\"")
    private String name;

    @Column(name = "\"Price\"")
    private int price;

    @Column(name = "\"Description\"")
    private String description;

    @Column(name = "\"Date\"")
    private Date date;

    protected EProduct() {}

    public EProduct(String name, int price, String description, Date date) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd");
        String strDate = dateFormat.format(date);  
        return strDate;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Product convert() {
        Product product = new Product();

        product.setId(this.getId());
        product.setName(this.getName());
        product.setPrice(this.getPrice());
        product.setDescription(this.getDescription());
        product.setDate(this.getDate());

        return product;
    }
}