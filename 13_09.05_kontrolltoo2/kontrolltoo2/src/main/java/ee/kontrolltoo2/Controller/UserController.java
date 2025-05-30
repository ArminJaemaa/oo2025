package ee.kontrolltoo2.Controller;

import ee.kontrolltoo2.Entity.CommentUser;
import ee.kontrolltoo2.Repository.CommentUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class UserController {
    @Autowired
    CommentUserRepository userRepository;

    @GetMapping("users")
    public Page<CommentUser> getUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @GetMapping("users/{id}")
    public CommentUser getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    @PostMapping("users")
    public CommentUser createUser(@RequestBody CommentUser user) {
        return userRepository.save(user);
    }
}
