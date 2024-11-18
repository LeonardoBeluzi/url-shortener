import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @Column({
    nullable: true,
  })
  userId?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt?: Date;
}
