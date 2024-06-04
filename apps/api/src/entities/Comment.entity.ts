import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  walletAddress: string;

  @Column()
  campaignAddress: string;

  @Column({
    nullable: true,
  })
  image: string;

  @CreateDateColumn()
  createdAt: Date;
}
