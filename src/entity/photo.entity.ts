import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_photo' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photourl: string;

  @Column()
  status: string;

  @Column()
  userjoinId: number;

  @ManyToOne(() => User, (user) => user.photos)
  userjoin: User;
}