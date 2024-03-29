import { BaseEntity } from '@src/entities/base.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { Role } from '@src/users/enums/role.enum';
import { Expose } from 'class-transformer';
import {
  Permission,
  PermissionType,
} from '@src/authorization/types/permissions.type';
import { ApiKey } from '@src/api-key/entities/api-key.entity';

// Enum to define user genders
export enum UserGenders {
  Male = 'Male',
  Female = 'Female',
  PreferNotToSay = 'PreferNotToSay',
}

@Entity({
  name: 'users',
  database: 'blogs',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class User extends BaseEntity {
  @Expose()
  id: string;

  // User's username, can be null
  @Column({ type: 'varchar', length: 255, nullable: true })
  username: string | null;

  // User's password
  @Column({ type: 'varchar', length: 64 })
  password: string;

  // User's phone number, nullable
  @Column({ type: 'varchar', length: 64, nullable: true })
  phone: string | null;

  // User's email (unique)
  @Column({ unique: true, type: 'varchar', length: 255, update: false })
  email: string;

  // User's gender, can be one of the defined enum values, default is PreferNotToSay
  @Column({
    type: 'enum',
    enum: UserGenders,
    default: UserGenders.PreferNotToSay,
    nullable: true,
  })
  gender: UserGenders | null;

  // User's full name, nullable
  @Column({ type: 'nvarchar', length: 255, default: '', nullable: true })
  fullname: string | null;

  // User's date of birth, stored as timestamp with the default set to current timestamp
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  dateOfBirth: Date | null;

  // URL to user's avatar image, default provided, nullable
  @Column({
    type: 'varchar',
    length: 255,
    default: 'https://cloud-image.com/default-image.webp',
    nullable: true,
  })
  avatar: string | null;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Guest,
    nullable: false,
  })
  role: Role;

  @Column({ enum: Permission, default: [], type: 'json' })
  permissions: PermissionType[];

  @OneToMany(() => ApiKey, (apiKey) => apiKey.user, {
    cascade: ['soft-remove', 'remove'],
  })
  apiKeys: Relation<ApiKey[]>;
}
