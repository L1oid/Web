package rest;

public class Product {
    private int id;
    private String productName;
    private int price;
    private String description;

    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductName() {
        return productName;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getPrice() {
        return price;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static Product createProduct(int id, String productName, int price, String description){
        Product newProduct = new Product();

        newProduct.setDescription(description);
        newProduct.setId(id);
        newProduct.setProductName(productName);
        newProduct.setPrice(price);

        return newProduct;
    }
}