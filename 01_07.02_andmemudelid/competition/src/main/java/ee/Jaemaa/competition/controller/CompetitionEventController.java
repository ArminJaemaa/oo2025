package ee.Jaemaa.competition.controller;

import ee.Jaemaa.competition.entity.CompetitionEvent;
import ee.Jaemaa.competition.repository.CompetitionEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CompetitionEventController {
    @Autowired
    CompetitionEventRepository competitionEventRepository;

    @GetMapping("events")
    public List<CompetitionEvent> getEvents() {
        return competitionEventRepository.findAll();
    }
    @PostMapping("events")
    public List<CompetitionEvent> addEvent(@RequestBody CompetitionEvent competitionEvent) {
        competitionEventRepository.save(competitionEvent);
        return competitionEventRepository.findAll();
    }
}
