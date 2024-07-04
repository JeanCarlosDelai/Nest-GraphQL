import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from '../../domain/interfaces/user.interface';

@ObjectType()
@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;
}
