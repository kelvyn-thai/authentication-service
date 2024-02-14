import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'createdAt',
  })
  createdAt: Date | null;

  @UpdateDateColumn({
    name: 'updatedAt',
    default: null,
  })
  updatedAt: Date | null;

  @DeleteDateColumn({
    name: 'deletedAt',
    default: null,
  })
  deletedAt: Date | null;
}
