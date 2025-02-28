package ee.jaemaa.keskmine.Controller;

import ee.jaemaa.keskmine.Entity.Arv;
import ee.jaemaa.keskmine.Repository.ArvRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class ArvController {
    @Autowired
    ArvRepository arvRepository;

    @GetMapping("arvud")
    public List<Arv> getArvud() {
        return arvRepository.findAll();
    }
    @PostMapping("arvud")
    public List<Arv> addArv(@RequestBody Arv arv) {
        arvRepository.save(arv);
        return arvRepository.findAll();
    }
    @GetMapping("arvud/summa")
    public List<Arv> getArvudSumma() {
        int summa = 0;
        for (int i = 0; i < arvRepository.findAll().size(); i++) {
            summa += arvRepository.findAll().get(i).getArv();
        }
        System.out.println(summa);
        return arvRepository.findAll();
    }
    @GetMapping("arvud/keskmine")
    public List<Arv> getArvudKeskmine() {
        double keskmine = 0;
        int summa = 0;
        int scanner = 0;
        for (int i = 0; i < arvRepository.findAll().size(); i++) {
            scanner ++;
            summa += arvRepository.findAll().get(i).getArv();
        }
        keskmine = (double) summa / scanner;
        System.out.println(keskmine);
        return arvRepository.findAll();
    }
    @GetMapping("arvud/suurim")
    public List<Arv> getArvudSuurim() {
        int suurim = 0;
        for (int i = 0; i < arvRepository.findAll().size(); i++) {
            if (arvRepository.findAll().get(i).getArv() > suurim) {
                suurim = arvRepository.findAll().get(i).getArv();
            }
        }
        System.out.println(suurim);
        return arvRepository.findAll();
    }
}
