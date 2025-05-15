package ee.jaemaa.ProoviKT2.repository;

import ee.jaemaa.ProoviKT2.entity.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministratorRepository extends JpaRepository<Administrator, Long> {
}
