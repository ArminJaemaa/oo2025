package ee.Jaemaa.competition.repository;

import ee.Jaemaa.competition.entity.CompetitionEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompetitionEventRepository extends JpaRepository<CompetitionEvent, Long> {
}