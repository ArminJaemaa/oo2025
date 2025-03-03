package ee.jaemaa.hulknurk.Repository;

import ee.jaemaa.hulknurk.Entity.Koordinaat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KoordinaatRepository extends JpaRepository<Koordinaat, Long> {
    List<Koordinaat> findAll();
}
