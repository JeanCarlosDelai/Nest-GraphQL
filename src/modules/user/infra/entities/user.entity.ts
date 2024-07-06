import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserInterface } from '../../domain/interfaces/user.interface';

@ObjectType()
@Entity('users')
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
