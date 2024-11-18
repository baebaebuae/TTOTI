package kr.co.ttoti.backend.domain.animal.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ttoti.backend.domain.animal.dto.AnimalDto;
import kr.co.ttoti.backend.domain.animal.service.AnimalListGetService;
import kr.co.ttoti.backend.global.dto.ResponseDto;
import kr.co.ttoti.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/ttoti/animals")
public class AnimalListGetController {

	private final AnimalListGetService animalListGetService;

	@GetMapping
	ResponseEntity<ResponseDto<List<AnimalDto>>> getAnimalList(){
		List<AnimalDto> animalList = animalListGetService.getAnimalList(true);
		return ResponseEntity.ok(ResponseDto.success(SuccessCode.OK, animalList));
	}
}
