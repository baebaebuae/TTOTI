package kr.co.ttoti.backend.global.config;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.kafka.listener.ContainerProperties;
import org.springframework.kafka.listener.MessageListener;

import com.fasterxml.jackson.databind.JsonDeserializer;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@EnableKafka
@Configuration
public class KafkaConsumerConfig {

	@Value("${spring.kafka.bootstrap-servers}")
	private String bootstrapServers;

	@Value("${spring.kafka.consumer.group-id}")
	private String groupId;

	// 동적 토픽 생성
	public void createTopic(String topicName) {
		Map<String, Object> configs = new HashMap<>();
		configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);

		try (AdminClient adminClient = AdminClient.create(configs)) {
			NewTopic newTopic = new NewTopic(topicName, 1, (short) 1);
			adminClient.createTopics(Collections.singleton(newTopic)).all().get();
		} catch (InterruptedException | ExecutionException e) {
			System.err.println("토픽 생성 중 오류 발생: " + e.getMessage());
		}
	}

	@Bean
	ConcurrentKafkaListenerContainerFactory<String, Object> kafkaListenerFactory() {
		ConcurrentKafkaListenerContainerFactory<String, Object> listenerContainerFactory = new ConcurrentKafkaListenerContainerFactory<>();
		listenerContainerFactory.setConsumerFactory(this.listenerFactory());
		return listenerContainerFactory;
	}

	@Bean
	public ConsumerFactory<String, Object> listenerFactory() {
		Map<String, Object> consumerConfigurations = new HashMap<String, Object>();

		consumerConfigurations.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
		consumerConfigurations.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
		consumerConfigurations.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
		consumerConfigurations.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
		consumerConfigurations.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "latest");

		return new DefaultKafkaConsumerFactory<>(consumerConfigurations);
	}

	// 특정 토픽에 대한 리스너 컨테이너 생성
	public ConcurrentMessageListenerContainer<String, String> createListenerContainer(String topic, MessageListener<String, String> listener) {
		ContainerProperties containerProps = new ContainerProperties(topic);
		containerProps.setMessageListener(listener);

		ConcurrentMessageListenerContainer<String, String> container =
			new ConcurrentMessageListenerContainer<>(this.listenerFactory(), containerProps);
		container.start();
		return container;
	}

}
