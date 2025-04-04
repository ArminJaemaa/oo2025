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
}
