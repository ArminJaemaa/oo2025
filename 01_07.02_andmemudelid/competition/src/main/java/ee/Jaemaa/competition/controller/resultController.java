package ee.Jaemaa.competition.controller;

import ee.Jaemaa.competition.entity.CompetitionEvent;
import ee.Jaemaa.competition.entity.Result;
import ee.Jaemaa.competition.entity.competitor;
import ee.Jaemaa.competition.repository.CompetitionEventRepository;
import ee.Jaemaa.competition.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static java.lang.Math.pow;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class resultController {
    @Autowired
    ResultRepository resultRepository;
    @Autowired
    private CompetitionEventRepository competitionEventRepository;
    @Autowired
    private ee.Jaemaa.competition.repository.competitionRepository competitionRepository;

    @GetMapping("results")
    public List<Result> getResults() {
        return resultRepository.findAll();
    }

    @PostMapping("results")
    public List<Result> addResult(@RequestBody Result result) {
        if (result.getEvent() == null || result.getEvent().getName() == null) {
            throw new RuntimeException("Event name is required");
        }

        Optional<CompetitionEvent> event = competitionEventRepository.findByName(result.getEvent().getName());
        CompetitionEvent eventEntity = event.orElseThrow(() -> new RuntimeException("Event not found"));

        result.setEvent(eventEntity);

        double a = event.get().getA();
        double b = event.get().getB();
        double c = event.get().getC();
        double resultValue = result.getResult();

        if (result.getEvent().getName().equals("100m jooks") || result.getEvent().getName().equals("400m jooks")
                || result.getEvent().getName().equals("100m tõkkejooks") || result.getEvent().getName().equals("1500m jooks")) {

            double y = (b - resultValue);
            double score = a * Math.pow(y, c);
            result.setResult(Math.round(score));

            resultRepository.save(result);
            return resultRepository.findAll();

        } else {
            double y = (resultValue - b);
            double score = a * Math.pow(y, c);
            result.setResult(Math.round(score));

            resultRepository.save(result);
            return resultRepository.findAll();
        }

    }

    @PutMapping("results")
    public List<Result> editResult(@RequestBody Result result) {
        if (result.getId() == null) {
            throw new RuntimeException("ERROR_ID_CANT_BE_NULL");
        }
        resultRepository.save(result);
        return resultRepository.findAll();
    }

    @GetMapping("/results/competitor/{name}")
    public List<Result> getResultsByCompetitorName(@PathVariable String name) {
        return resultRepository.findByCompetitor_firstName(name);
    }
    /* @GetMapping("/results/competitor/{name}/punktid")
    public List<Result> getAllPointsByCompetitorName(@PathVariable String name) {
        int punktid = 0;
        //List<Result> nimi = resultRepository.findByCompetitor_firstName(name);
        Optional<competitor> nimi = competitionRepository.findByName(name);
        for (int i = 0; i < resultRepository.findAll().size(); i++) {
            punktid += (int) resultRepository.findByCompetitor_firstName(nimi).get(i).getResult();


        }
        System.out.println(punktid);
        return resultRepository.findAll();
    }
    */

    @GetMapping("/competitor-result")
    public Page<Result> getResultsByCompetitor(@RequestParam Long competitorId, Pageable pageable) {
        if (competitorId == -1) {
            return resultRepository.findAll(pageable);
        }
        return resultRepository.findByCompetitor_Id(competitorId, pageable);
    }

    @DeleteMapping("/results/{id}")
    public List<Result> deleteResult(@PathVariable Long id) {
        resultRepository.deleteById(id);
        return resultRepository.findAll();
    }

    @GetMapping("results/{id}")
    public Result getResult(@PathVariable Long id) {
        return resultRepository.findById(id).orElseThrow();
    }
}