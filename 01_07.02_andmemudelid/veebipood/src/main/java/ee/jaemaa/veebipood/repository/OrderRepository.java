package ee.jaemaa.veebipood.repository;

import ee.jaemaa.veebipood.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
