package ee.Jaemaa.competition.repository;

import ee.Jaemaa.competition.entity.CompetitionEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompetitionEventRepository extends JpaRepository<CompetitionEvent, Long> {
    Optional<CompetitionEvent> findByName(String name);
}