package ee.jaemaa.kontrolltoo.Repository;

import ee.jaemaa.kontrolltoo.Entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {
}
