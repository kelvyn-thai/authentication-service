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
    name: 'created_at',
  })
  createdAt: Date | null;

  @UpdateDateColumn({
    name: 'updated_at',
    default: null,
  })
  updatedAt: Date | null;

  @DeleteDateColumn({
    name: 'deleted_at',
    default: null,
  })
  deletedAt: Date | null;
}
