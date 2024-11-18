package kr.co.ttoti.backend.global.util;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import kr.co.ttoti.backend.global.config.KafkaConsumerConfig;
import lombok.RequiredArgsConstructor;

import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.kafka.listener.MessageListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class KafkaConsumerUtil {

    private final SimpMessageSendingOperations messageSending;
    private final KafkaConsumerConfig kafkaConsumerConfig;

    // 사용자별 리스너 컨테이너를 관리하는 Map
    private final Map<Integer, ConcurrentMessageListenerContainer<String, String>> listenerContainers = new ConcurrentHashMap<>();

    // 사용자에게 토픽을 할당하고 리스너 시작
    public void startListening(Integer ttotiId) {
        String topicName = "sub-" + ttotiId;

        // 이미 리스너가 있는 경우 재구독 방지
        if (listenerContainers.containsKey(ttotiId)) {
            return;
        }

        // 동적 토픽 생성
        kafkaConsumerConfig.createTopic(topicName);

        // 리스너 설정 및 시작
        ConcurrentMessageListenerContainer<String, String> listenerContainer = kafkaConsumerConfig.createListenerContainer(
            topicName,
            (MessageListener<String, String> ) record -> {
                String message = record.value();
                messageSending.convertAndSend("/sub/" + topicName, message);
            }
        );

        listenerContainers.put(ttotiId, listenerContainer);
    }

    // 리스너 정지 및 제거
    public void stopListening(Integer ttotiId) {
        ConcurrentMessageListenerContainer<String, String> listenerContainer = listenerContainers.remove(ttotiId);
        if (listenerContainer != null) {
            listenerContainer.stop();
        }
    }
}
