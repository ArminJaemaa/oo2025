package ee.jaemaa.keskmine.Controller;

import ee.jaemaa.keskmine.Entity.Arv;
import ee.jaemaa.keskmine.Repository.ArvRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

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
    public int getArvudSumma() {
        int summa = 0;
        for (int i = 0; i < arvRepository.findAll().size(); i++) {
            summa += arvRepository.findAll().get(i).getArv();
        }
        System.out.println(summa);
        return summa;
    }
    @GetMapping("arvud/keskmine")
    public double getArvudKeskmine() {
        int summa = 0;
        int scanner = 0;
        for (int i = 0; i < arvRepository.findAll().size(); i++) {
            scanner ++;
            summa += arvRepository.findAll().get(i).getArv();
        }
        double keskmine = (double) summa / scanner;
        System.out.println(keskmine);
        return keskmine;
    }
    @GetMapping("arvud/suurim")
    public int getArvudSuurim() {
        int suurim = 0;
        for (int i = 0; i < arvRepository.findAll().size(); i++) {
            if (arvRepository.findAll().get(i).getArv() > suurim) {
                suurim = arvRepository.findAll().get(i).getArv();
            }
        }
        System.out.println(suurim);
        return suurim;
    }
    @GetMapping("libisevKeskmine")
    public List<Double> getLibisevKeskmine() {
        List<Arv> arvud = arvRepository.findAll();
        List<Double> libisevKeskmine = new ArrayList<>();
        for (int i = 0; i < arvud.size() - 2; i++) {
            double keskmine = (arvud.get(i).getArv()
                    + arvud.get(i + 1).getArv()
                    + arvud.get(i + 2).getArv()/ 3.0);
            libisevKeskmine.add(keskmine);
        }
        System.out.println(libisevKeskmine);
        return libisevKeskmine;


    }
}
