package ee.Jaemaa.competition.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class competitionController {

    @GetMapping("competition")
    public String competition() {
        return "Hello World!";
    }
}
