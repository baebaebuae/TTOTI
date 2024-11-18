package kr.co.ttoti.backend.domain.room.mongo.repository;

import kr.co.ttoti.backend.domain.room.document.RoomEnding;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomEndingRepository extends MongoRepository<RoomEnding, Integer> {
}
