import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AuthInputDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
