package ee.jaemaa.hulknurk.Controller;

import ee.jaemaa.hulknurk.Entity.Koordinaat;
import ee.jaemaa.hulknurk.Repository.KoordinaatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

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
    public int ümbermõõt(){
        if (koordinaatRepository.findAll().size() < 3){
            throw new RuntimeException("ERROR_NOT_ENOUGH_COORDINATES");
        }else{
            //int x = koordinaatRepository.getKoordinaatByX; ?? kas pean panema repository findby x jne?
            return koordinaatRepository.findAll().size();
    }
    }
}
