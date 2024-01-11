import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date | null;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date | null;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date | null;
}
