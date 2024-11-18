import { User } from '../../user/models/user.model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['shortUrl'])
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  longUrl: string;

  @Column()
  shortUrl: string;

  @Column()
  hits: number;

  @ManyToOne(() => User, (user) => user.id)
  user?: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt?: Date;
}
