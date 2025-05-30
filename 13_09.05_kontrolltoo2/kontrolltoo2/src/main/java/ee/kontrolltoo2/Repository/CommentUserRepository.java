package ee.kontrolltoo2.Repository;

import ee.kontrolltoo2.Entity.CommentUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentUserRepository extends JpaRepository<CommentUser, Long> {

    Page<CommentUser> findAll(Pageable pageable);
}
