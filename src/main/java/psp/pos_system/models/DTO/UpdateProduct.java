package psp.pos_system.models.DTO;

import java.sql.Timestamp;

public class UpdateProduct {
    public UpdateProduct(String name, int price) {
        this.name = name;
        this.price = price;
    }

    private String name;
    private int price;
    private Timestamp created;
    private Timestamp updated;

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public Timestamp getCreated() {
        return created;
    }

    public Timestamp getUpdated() {
        return updated;
    }
}
