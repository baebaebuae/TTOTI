package kr.co.ttoti.backend.domain.animal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.ttoti.backend.domain.animal.entity.Animal;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Integer> {

	List<Animal> findByAnimalIsAvailable(boolean animalIsAvailable);
	Optional<Animal> findByAnimalIsAvailableAndAnimalId(boolean animalIsAvailable, int animalId);
}
