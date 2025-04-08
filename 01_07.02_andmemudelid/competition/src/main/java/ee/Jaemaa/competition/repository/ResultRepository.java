package ee.Jaemaa.competition.repository;

import ee.Jaemaa.competition.entity.Result;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByCompetitor_firstName(String Firstname);
    Page<Result> findByCompetitor_Id(Long id, Pageable pageable);
}
