import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserGeners {
  'Male',
  'Female',
  'PreferNotToSay',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  username: string;

  @Column({ default: '' })
  fullname: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: UserGeners.PreferNotToSay })
  gender: UserGeners;

  @Column()
  password: string;
}
