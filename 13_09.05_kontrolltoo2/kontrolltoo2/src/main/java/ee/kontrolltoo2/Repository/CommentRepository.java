package ee.kontrolltoo2.Repository;

import ee.kontrolltoo2.Entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {


    Page<Comment> findByCommentUser_Id(Long id, Pageable pageable);
}
