package com.kolmanfreecss.kolmanfreecss.datagithub.infrastructure.adapters.output;

import com.kolmanfreecss.kolmanfreecss.datagithub.infrastructure.adapters.output.dto.KafkaMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaProducer {

    public static final String TOPIC = "replace with your topic name";

    private final KafkaTemplate<String, KafkaMessage> kafkaTemplate;

    public void sendFlightEvent(final KafkaMessage event){
       kafkaTemplate.send(TOPIC, event.getId(), event);
       log.info("Producer produced the message {}", event);
       // write your handlers and post-processing logic, based on your use case
    }

}