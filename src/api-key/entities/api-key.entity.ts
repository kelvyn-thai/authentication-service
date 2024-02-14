import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { BaseEntity } from '@src/entities/base.entity';
import { User } from '@src/users/entities/user.entity';

@Entity({
  name: 'apikeys',
  database: 'blogs',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class ApiKey extends BaseEntity {
  @Column({
    length: 255,
    nullable: false,
    type: 'nvarchar',
  })
  apiKey: string;

  @Column({
    length: 255,
    nullable: false,
    type: 'nvarchar',
  })
  hashedKey: string;

  @ManyToOne(() => User, (user) => user.apiKeys)
  user: Relation<User>;
}
