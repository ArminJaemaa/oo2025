package ee.jaemaa.ProoviKT2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Word {
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY)

    private Long id;
    private String word;
    private String description;

    @ManyToOne
    private Administrator administrator;
}
