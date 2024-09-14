package com.kolmanfreecss.kolmanfreecss.datagithub.domain.repository.jdbc;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * JDBC Implementation
 * Repository for User
 */
@Repository
public class UserRepository {
    
    private final JdbcTemplate jdbcTemplate;
    
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    public void saveUser(String name, String email) {
        jdbcTemplate.update("INSERT INTO user (name, email) VALUES (?, ?)", name, email);
    }
}
