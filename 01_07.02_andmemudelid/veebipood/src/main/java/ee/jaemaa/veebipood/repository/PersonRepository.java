package ee.jaemaa.veebipood.repository;

import ee.jaemaa.veebipood.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
