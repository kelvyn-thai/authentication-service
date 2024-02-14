import { User } from '@src/users/entities/user.entity';
import { BaseEntity } from '@src/entities/base.entity';
import { Column, Entity } from 'typeorm';

export enum PostStatus {
  DRAFT = 'Draft',
  PENDING = 'Pending',
  ACTIVATE = 'Activate',
}

@Entity({
  name: 'posts',
  database: 'blogs',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class Post extends BaseEntity {
  id: string;

  @Column({
    nullable: false,
    type: 'nvarchar',
    length: 64,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    enum: PostStatus,
    nullable: false,
    default: PostStatus.DRAFT,
  })
  status: PostStatus;

  @Column({
    type: 'int',
    nullable: false,
  })
  authorID: User['id'];
}
