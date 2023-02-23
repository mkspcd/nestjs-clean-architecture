import { IsNotEmpty, IsString } from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string

  @IsString()
  readonly name: string

  @IsString()
  readonly email: string
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsString()
  readonly email: string
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string

  @IsString()
  readonly name: string

  @IsString()
  readonly email: string
}
