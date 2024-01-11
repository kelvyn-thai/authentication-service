import { BaseEntity } from '@src/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    created_at: 'DESC',
  },
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({})
  id: number;

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
    name: 'date_of_birth',
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
}
