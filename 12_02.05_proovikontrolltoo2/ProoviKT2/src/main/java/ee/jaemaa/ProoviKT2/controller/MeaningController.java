package ee.jaemaa.ProoviKT2.controller;


import ee.jaemaa.ProoviKT2.entity.Meaning;
import ee.jaemaa.ProoviKT2.repository.MeaningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class MeaningController {
    @Autowired
    MeaningRepository meaningRepository;

    @GetMapping("meanings")
    public List<Meaning> findAll() {
        return meaningRepository.findAll();
    }

    @PostMapping("meanings")
    public List<Meaning> addMeaning(@RequestBody Meaning meaning) {
        meaningRepository.save(meaning);
        return meaningRepository.findAll();
    }

    @DeleteMapping("meaning/{id}")
    public List<Meaning> deleteMeaning(@PathVariable Long id) {
        meaningRepository.deleteById(id);
        return meaningRepository.findAll();
    }
}
