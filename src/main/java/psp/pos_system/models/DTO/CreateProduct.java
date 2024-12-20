package psp.pos_system.models.DTO;

import java.util.UUID;

public class CreateProduct {
    public CreateProduct(String name, int price, int quantity, UUID categoryId) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.categoryId = categoryId;
    }

    private String name;
    private int price;
    private int quantity;
    private UUID categoryId;

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public UUID getCategoryId(){
        return categoryId;
    }
}
