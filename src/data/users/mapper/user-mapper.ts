import type { User } from '../../../domain/users/models/user';
import type { UserEntity } from '../models/user-entity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return {
      id: entity.id,
      username: entity.username,
      password: entity.password,
    };
  }
  static toEntity(domain: User): UserEntity {
    return {
      id: domain.id,
      username: domain.username,
      password: domain.password,
    };
  }
}
