package ee.Jaemaa.competition.controller;

import ee.Jaemaa.competition.entity.Result;
import ee.Jaemaa.competition.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class resultController {
    @Autowired
    ResultRepository resultRepository;

    @GetMapping("results")
    public List<Result> getResults() {
        return resultRepository.findAll();
    }
    @PostMapping("results")
    public List<Result> addResult(@RequestBody Result result) {
        resultRepository.save(result);
        return resultRepository.findAll();
    }
    @PutMapping("results")
    public List<Result> editResult(@RequestBody Result result) {
        if (result.getId() == null) {
            throw new RuntimeException("ERROR_ID_CANT_BE_NULL");
        }
        resultRepository.save(result);
        return resultRepository.findAll();
    }
    @GetMapping("results/{id}")
    public Result getResult(@PathVariable Long id) {
        return resultRepository.findById(id).orElseThrow();
    }
}
