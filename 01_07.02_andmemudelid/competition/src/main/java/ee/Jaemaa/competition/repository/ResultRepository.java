package ee.Jaemaa.competition.repository;

import ee.Jaemaa.competition.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Long> {
}
