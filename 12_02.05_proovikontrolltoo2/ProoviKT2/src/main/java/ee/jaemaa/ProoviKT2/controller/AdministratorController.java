package ee.jaemaa.ProoviKT2.controller;

import ee.jaemaa.ProoviKT2.entity.Administrator;
import ee.jaemaa.ProoviKT2.repository.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class AdministratorController {

    @Autowired
    AdministratorRepository administratorRepository;

    @GetMapping("admin")
    public List<Administrator> findAll() {
        return administratorRepository.findAll();
    }

    @PostMapping("admin")
    public Administrator create(@RequestBody Administrator administrator) {
        return administratorRepository.save(administrator);
    }
}
