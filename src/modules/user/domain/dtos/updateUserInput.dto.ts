import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInputDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly password?: string;
}
