package ee.kontrolltoo2.Controller;

import ee.kontrolltoo2.Entity.Comment;
import ee.kontrolltoo2.Entity.CommentUser;
import ee.kontrolltoo2.Repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class CommentController {
    @Autowired
    CommentRepository commentRepository;

    @GetMapping("comments")
    public List<Comment> getComments() {
        return commentRepository.findAll();
    }

    @GetMapping("/comments/{id}")
    public Comment getComment(@PathVariable Long id) {
        return commentRepository.findById(id).orElseThrow();
    }

    @PostMapping("comments")
    public List<Comment> addComment(@RequestBody Comment comment) {
        commentRepository.save(comment);
        return commentRepository.findAll();
    }

    @DeleteMapping("comments/{id}")
    public List<Comment> deleteComment(@PathVariable Long id) {
        commentRepository.deleteById(id);
        return commentRepository.findAll();
    }

    @PutMapping("comments/{id}")
    public Comment updateComment(@PathVariable Long id,@RequestBody Comment comment) {
        if (comment.getId() == null) {
            throw new RuntimeException("Comment id cant be null");
        }
        if (!id.equals(comment.getId())) {
            throw new RuntimeException("Path id and comment id don't match");
        }
        return commentRepository.save(comment);
    }

    @GetMapping("comment-user")
    public Page<Comment> getCommentUser(@RequestParam Long userId, Pageable pageable) {
        if (userId == -1) {
            return commentRepository.findAll(pageable);
        }
        return commentRepository.findByCommentUser_Id(userId, pageable);
    }
}
