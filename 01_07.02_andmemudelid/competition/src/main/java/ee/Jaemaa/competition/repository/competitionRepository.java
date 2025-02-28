package ee.Jaemaa.competition.repository;

import ee.Jaemaa.competition.entity.competitor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface competitionRepository extends JpaRepository<competitor, Long> {
    Optional<competitor> findByName(String name);

}
