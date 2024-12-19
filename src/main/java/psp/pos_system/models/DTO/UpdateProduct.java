package psp.pos_system.models.DTO;

import java.sql.Timestamp;

public class UpdateProduct {

    public UpdateProduct(String name, int price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    private String name;
    private int price;
    private int quantity;
    private Timestamp created;
    private Timestamp updated;

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }
    public int getQuantity() {
        return quantity;
    }

    public Timestamp getCreated() {
        return created;
    }

    public Timestamp getUpdated() {
        return updated;
    }
}
