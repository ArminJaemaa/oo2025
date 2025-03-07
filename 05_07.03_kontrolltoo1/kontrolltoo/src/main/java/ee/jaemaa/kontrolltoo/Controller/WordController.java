package ee.jaemaa.kontrolltoo.Controller;

import ee.jaemaa.kontrolltoo.Entity.Total;
import ee.jaemaa.kontrolltoo.Entity.Word;
import ee.jaemaa.kontrolltoo.Repository.TotalRepository;
import ee.jaemaa.kontrolltoo.Repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WordController {
    @Autowired
    WordRepository wordRepository;
    @Autowired
    TotalRepository totalRepository;

    @GetMapping("words")
    public List<Word> findAllWords() {
        return wordRepository.findAll();
    }

    @PostMapping("words")
    public List<Word> saveWord(@RequestBody Word word) {
        int count = 0;
        if (word.getId() != null) {
            throw new RuntimeException("CANT_ADD_WITH_ID");
        } else {
            for (int i = 0; i < word.getWord().length(); i++) {
                char currentChar = word.getWord().charAt(i);
                if (Character.isSpaceChar(currentChar)) {
                    count++;
                }
            }
            if (count > 0) {
                throw new RuntimeException("CANT_ADD_A_SENTENCE");
            } else {
                wordRepository.save(word);
            }
        }
        return wordRepository.findAll();
    }

    @GetMapping("/words/letters")
    public String findLettersCount() {
        List<Word> words = wordRepository.findAll();

        int count = 0;
        for (Word word : words) {
            count += countTähed(word.getWord(), 'a', 'A');
        }
        return "Tähtede arv on: " + count;
    }

    private int countTähed(String word, char char1, char char2) {
        int count = 0;
        for (char c : word.toCharArray()) {
            if (c == char1 || c == char2) {
                count++;
            }
        }
        return count;
    }

    @GetMapping("/words/word_count")
    public String countWordsWithLetter() {
        List<Word> words = wordRepository.findAll();

        int count = 0;
        for (Word word : words) {
            if (wordContainsLetter(word.getWord(), 'a', 'A')) {
                count++;
            }
        }
        return " Sõnade arv on: " + count;
    }

    private boolean wordContainsLetter(String word, char char1, char char2) {
        for (char c : word.toCharArray()) {
            if (c == char1 || c == char2) {
                return true;
            }
        }
        return false;
    }
    @GetMapping("/words/keskmine")
    public String averageLetters() {
        List<Word> words = wordRepository.findAll();

        int totalLetters = 0;
        int totalACount = 0;

        for (Word word : words) {
            int wordLength = word.getWord().length();
            int aCount = countLetters(word.getWord(), 'a', 'A');

            totalLetters += wordLength;
            totalACount += aCount;
        }
        double averageRatio = (double) totalLetters / totalACount;
        return "Keskmine on: " + averageRatio;
    }

    private int countLetters(String word, char char1, char char2) {
        int count = 0;
        for (char c : word.toCharArray()) {
            if (c == char1 || c == char2) {
                count++;
            }
        }
        return count;
    }
    @GetMapping("total")
    public List<Total> totalCount() {
        return totalRepository.findAll();
    }
    @PostMapping("total")
    public List<Total> saveTotal() {
        List<Word> words = wordRepository.findAll();

        int count = 0;
        for (Word word : words) {
            count += countTähed(word.getWord(), 'a', 'A');
        }
        Total total = new Total();
        total.setTotal(count);
        totalRepository.save(total);
        return totalRepository.findAll();
    }
    @PutMapping("/words/replace/{num}")
    public List<Word> replaceLetter(@PathVariable int num) {
        List<Word> words = wordRepository.findAll();

        for (Word word : words) {
            if (word.getWord().length() > num) {
                char[] chars = word.getWord().toCharArray();
                chars[num] = 'a';
                word.setWord(new String(chars));
                wordRepository.save(word); //
            }
        }
        return wordRepository.findAll();
    }
}


