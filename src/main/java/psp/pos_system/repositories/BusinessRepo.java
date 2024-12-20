package psp.pos_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import psp.pos_system.models.Business;

import java.util.UUID;

@Repository
public interface BusinessRepo extends JpaRepository<Business, UUID> {
}
