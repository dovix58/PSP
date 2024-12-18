package psp.pos_system.models.DTO;

public class CreateProduct {
    public CreateProduct(String name, int price) {
        this.name = name;
        this.price = price;
    }

    private String name;
    private int price;

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }
}
