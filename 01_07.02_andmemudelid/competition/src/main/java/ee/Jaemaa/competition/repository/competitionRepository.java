package ee.Jaemaa.competition.repository;

import ee.Jaemaa.competition.entity.competitor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface competitionRepository extends JpaRepository<competitor, Long> {
}
