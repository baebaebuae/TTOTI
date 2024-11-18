package kr.co.ttoti.backend.domain.ttoti.common;

import kr.co.ttoti.backend.domain.chat.repository.ChatMessageRepository;
import kr.co.ttoti.backend.domain.quiz.repository.QuizAnswerRepository;
import kr.co.ttoti.backend.domain.ttoti.entity.Ttoti;
import kr.co.ttoti.backend.domain.ttoti.entity.TtotiEnding;
import kr.co.ttoti.backend.domain.ttoti.repository.TtotiEndingRepository;
import kr.co.ttoti.backend.global.exception.CustomException;
import kr.co.ttoti.backend.global.status.ErrorCode;
import org.springframework.stereotype.Component;

import kr.co.ttoti.backend.domain.room.entity.Room;
import kr.co.ttoti.backend.domain.ttoti.repository.TtotiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TtotiServiceUtils {

	private final TtotiEndingRepository ttotiEndingRepository;
	private final TtotiRepository ttotiRepository;
	private final QuizAnswerRepository quizAnswerRepository;
	private final ChatMessageRepository chatMessageRepository;

	@Transactional
	public void finishTtotiChat(Room room) {
		ttotiRepository.findByRoom(room).forEach(ttoti -> {
				ttoti.updateTtotiChatIsFinished(true);
			}
		);
	}

	@Transactional
	public void calculateTtotiEnding(Room room) {

		List<Ttoti> ttotiList = ttotiRepository.findByRoom(room);

        for (Ttoti ttoti : ttotiList) {
			ttotiEndingRepository.save(TtotiEnding.builder()
							.ttotiId(ttoti.getTtotiId())
							.endingCorrectScore(quizAnswerRepository.calculateScore(ttoti.getTtotiId()))
							.endingChatCount(chatMessageRepository.calculateSendMessage(ttoti.getTtotiId(), ttoti.getMember().getMemberId()))
							.endingFinalTemperature(ttoti.getTtotiTemperature())
					.build()
			);
        }
	}
}
