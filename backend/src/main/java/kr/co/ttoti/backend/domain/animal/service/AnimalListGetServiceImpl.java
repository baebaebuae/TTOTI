package kr.co.ttoti.backend.domain.animal.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.ttoti.backend.domain.animal.repository.AnimalRepository;
import kr.co.ttoti.backend.domain.animal.dto.AnimalDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnimalListGetServiceImpl implements AnimalListGetService{

	private final AnimalRepository animalRepository;

	@Override
	public List<AnimalDto> getAnimalList(boolean animalIsAvailable) {
		return animalRepository.findByAnimalIsAvailable(animalIsAvailable).stream()
			.map(animal -> AnimalDto.builder()
				.animalId(animal.getAnimalId())
				.animalName(animal.getAnimalName())
				.animalDescription(animal.getAnimalDescription())
				.animalImageUrl(animal.getAnimalImageUrl())
				.build())
			.toList();
	}
}
