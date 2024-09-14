package com.kolmanfreecss.kolmanfreecss.datagithub.domain.repository.hibernate;

import com.kolmanfreecss.kolmanfreecss.datagithub.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHibernateRepository extends JpaRepository<User, Long> {
}
