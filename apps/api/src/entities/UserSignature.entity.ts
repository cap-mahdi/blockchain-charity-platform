import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserSignature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  address: string;

  @Column({
    unique: true,
  })
  nonce: string;
}
