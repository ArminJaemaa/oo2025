package ee.Jaemaa.competition.controller;

import ee.Jaemaa.competition.repository.competitionRepository;
import ee.Jaemaa.competition.entity.competitor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class competitorController {

    @Autowired
    competitionRepository competitionRepository;

    @GetMapping("competition")
    public List<competitor> getCompetitor(){
        return competitionRepository.findAll();
    }
    @PostMapping("competition")
    public List<competitor> addCompetitor(@RequestBody competitor competitor) {
        competitionRepository.save(competitor);
        return competitionRepository.findAll();
    }
    @GetMapping("competition/{id}")
    public competitor getCompetitor(@PathVariable Long id) {
        return competitionRepository.findById(id).orElseThrow();
    }

    @PutMapping("competition/{id}")
    public competitor updateCompetitor(@RequestBody competitor competitor, @PathVariable Long id) {
        competitionRepository.save(competitor);
        return competitionRepository.findById(id).orElseThrow();
    }

    @DeleteMapping("competition/{id}")
    public List<competitor> deleteCompetitor(@PathVariable Long id) {
        competitionRepository.deleteById(id);
        return competitionRepository.findAll();
    }
}
