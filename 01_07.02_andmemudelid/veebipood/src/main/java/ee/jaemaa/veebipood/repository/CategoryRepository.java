package ee.jaemaa.veebipood.repository;

import ee.jaemaa.veebipood.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
