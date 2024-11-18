package kr.co.ttoti.backend.domain.animal.service;

import java.util.List;

import kr.co.ttoti.backend.domain.animal.dto.AnimalDto;

public interface AnimalListGetService {

	List<AnimalDto> getAnimalList(boolean animalIsAvailable);
}
