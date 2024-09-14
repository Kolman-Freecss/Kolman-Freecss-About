package com.kolmanfreecss.kolmanfreecss.datagithub.infrastructure.rest;

import com.kolmanfreecss.kolmanfreecss.datagithub.infrastructure.adapters.output.KafkaProducer;
import com.kolmanfreecss.kolmanfreecss.datagithub.infrastructure.adapters.output.dto.KafkaMessage;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/github")
public class GeneralGithubDataController {
    
    private final KafkaProducer kafkaProducer;
    
    public GeneralGithubDataController(KafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }
    
    @PostMapping("/send")
    public void sendGithubData(final @RequestBody List<KafkaMessage> githubData) {
        githubData.forEach(kafkaProducer::sendFlightEvent);
    }
    
}
