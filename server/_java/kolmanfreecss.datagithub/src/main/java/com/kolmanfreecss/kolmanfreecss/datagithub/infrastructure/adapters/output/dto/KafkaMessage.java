package com.kolmanfreecss.kolmanfreecss.datagithub.infrastructure.adapters.output.dto;

public record KafkaMessage() {
    private static String id;
    private static String message;
    
    public String getId() {
        return id;
    }
    
    public String getMessage() {
        return message;
    }
}
