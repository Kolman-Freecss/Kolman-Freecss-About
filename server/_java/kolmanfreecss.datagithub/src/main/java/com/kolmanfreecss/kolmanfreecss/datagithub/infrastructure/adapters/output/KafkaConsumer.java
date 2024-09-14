package com.kolmanfreecss.kolmanfreecss.datagithub.infrastructure.adapters.output;

import com.kolmanfreecss.kolmanfreecss.datagithub.infrastructure.adapters.output.dto.KafkaMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class KafkaConsumer {

    @KafkaListener(topics = "replace with your topic name", groupId = "replace with your group id ")
    public void flightEventConsumer(final KafkaMessage message) {
        log.info("Consumer consume Kafka message -> {}", message);

        // write your handlers and post-processing logic, based on your use case
    }

}