package psp.pos_system.models.DTO;

public class CreateProduct {
    public CreateProduct(String name, int price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    private String name;
    private int price;
    private int quantity;

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }
}
