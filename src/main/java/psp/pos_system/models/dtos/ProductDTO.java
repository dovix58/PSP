package psp.pos_system.models.dtos;

import java.sql.Timestamp;

public class ProductDTO {
    public ProductDTO(String name, int price) {
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
