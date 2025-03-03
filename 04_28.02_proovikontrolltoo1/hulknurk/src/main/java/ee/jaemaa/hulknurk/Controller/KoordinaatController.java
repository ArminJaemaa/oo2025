package ee.jaemaa.hulknurk.Controller;

import ee.jaemaa.hulknurk.Entity.Koordinaat;
import ee.jaemaa.hulknurk.Repository.KoordinaatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class KoordinaatController {
    @Autowired
    KoordinaatRepository koordinaatRepository;

    @GetMapping("koordinaat")
    public List<Koordinaat> findAll() {
        return koordinaatRepository.findAll();
    }
    @PostMapping("koordinaat")
    public List<Koordinaat> add(@RequestBody Koordinaat koordinaat) {
        koordinaatRepository.save(koordinaat);
        return koordinaatRepository.findAll();
    }
    @GetMapping("ümbermõõt")
    public double ümbermõõt(){
        if (koordinaatRepository.findAll().size() < 3){
            throw new RuntimeException("ERROR_NOT_ENOUGH_COORDINATES");
        }else{
            List<Koordinaat> koordinaadid = koordinaatRepository.findAll();
            List<Double> xKoordinaadid = new ArrayList<>();
            List<Double> yKoordinaadid = new ArrayList<>();
            for (Koordinaat k : koordinaadid) {
                xKoordinaadid.add(k.getX());
                yKoordinaadid.add(k.getY());
            }
            System.out.println("X koordinaadid: " + xKoordinaadid);
            System.out.println("Y koordinaadid: " + yKoordinaadid);
            int ümbermõõt = 0;
            for (int i = 0; i < koordinaatRepository.findAll().size()-1; i++) {
                double deltaX = Math.pow(xKoordinaadid.get(i+1) - xKoordinaadid.get(i),2);
                double deltaY = Math.pow(yKoordinaadid.get(i+1) - yKoordinaadid.get(i),2);
                ümbermõõt += Math.round(Math.sqrt(deltaX + deltaY));
                System.out.println(ümbermõõt);
            }

            return ümbermõõt;
        }
    }
}
