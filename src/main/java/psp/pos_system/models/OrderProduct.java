package psp.pos_system.models;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import psp.pos_system.models.Keys.OrderProductKey;

import java.math.BigInteger;

@Entity
@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orderProduct", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"order_id", "product_id"})
})

public class OrderProduct {
    @EmbeddedId
    private OrderProductKey id;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;

    private BigInteger price;

}
