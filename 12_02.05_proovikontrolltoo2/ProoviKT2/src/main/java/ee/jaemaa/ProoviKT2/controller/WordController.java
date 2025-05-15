package ee.jaemaa.ProoviKT2.controller;

import ee.jaemaa.ProoviKT2.entity.Word;
import ee.jaemaa.ProoviKT2.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.View;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class WordController {
    @Autowired
    WordRepository wordRepository;

    @GetMapping("words")
    public List<Word> getWords() {
        return wordRepository.findAll();
    }

    @GetMapping("words/{id}")
    public Word getWord(@PathVariable Long id) {
        return wordRepository.findById(id).orElseThrow();
    }

    @PostMapping("words")
    public List<Word> addWord(@RequestBody Word word) {
        wordRepository.save(word);
        return wordRepository.findAll();
    }

    @DeleteMapping("words/{id}")
    public List<Word> deleteWord(@PathVariable Long id) {
        wordRepository.deleteById(id);
        return wordRepository.findAll();
    }

    @PutMapping("words")
    public Word updateWord(@RequestBody Word word) {
        if(word.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if(word.getWord() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_WORD");
        }
        if(word.getDescription() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_DESCRIPTION");
        }
        wordRepository.save(word);
        return wordRepository.findById(word.getId()).orElseThrow();
    }

    @GetMapping("words-meaning")
    public Page<Word> getWordsMeaning(
            @RequestParam(required = false) Long id,
            Pageable pageable
    ) {
        if (id == null || id == -1) {
            return wordRepository.findAll(pageable);
        } else {
            // Filter by ID using Specification
            Specification<Word> spec = (root, query, cb) -> cb.equal(root.get("id"), id);
            return wordRepository.findAll(spec, pageable);
        }
    }

    @GetMapping("/word-admin")
    public Page<Word> getWordAdmin(
            @RequestParam Long AdminId, Pageable pageable
    ){
        if (AdminId == null || AdminId == -1) {
            return wordRepository.findAll(pageable);
    } else {
        return wordRepository.findByAdministratorId(AdminId, pageable);
        }
    }

    @PutMapping("/word-admin/{id}")
    public Word updateWordAdmin(@PathVariable Long id, @RequestBody Word word) {
        word.setId(id);
        wordRepository.save(word);
        return wordRepository.findById(id).orElseThrow();
    }
}
