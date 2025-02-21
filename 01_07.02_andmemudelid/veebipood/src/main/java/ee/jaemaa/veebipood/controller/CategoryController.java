package ee.jaemaa.veebipood.controller;


import ee.jaemaa.veebipood.entity.Category;
import ee.jaemaa.veebipood.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("categories")
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @PostMapping("categories")
    public List<Category> addCategory(@RequestBody Category category) {
        if (category.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        categoryRepository.save(category);
        return categoryRepository.findAll();
    }
    @PutMapping("categories")
    public List<Category> updateCategory(@RequestBody Category category) {
        if (category.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        categoryRepository.save(category);
        return categoryRepository.findAll();
    }
    @DeleteMapping("categories/{id}")
    public List<Category> deleteCategory(@PathVariable Long id){
        categoryRepository.deleteById(id);
        return categoryRepository.findAll();
    }
}
