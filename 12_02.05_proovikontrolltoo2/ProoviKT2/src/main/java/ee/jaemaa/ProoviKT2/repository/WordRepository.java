package ee.jaemaa.ProoviKT2.repository;

import ee.jaemaa.ProoviKT2.entity.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface WordRepository extends JpaRepository<Word, Long>, JpaSpecificationExecutor<Word> {


    Page<Word> findByAdministratorId(Long id, Pageable pageable);
}
