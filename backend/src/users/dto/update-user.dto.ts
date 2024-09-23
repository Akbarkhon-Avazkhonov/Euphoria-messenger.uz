import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['login'] as const),
) {}
export class UpdateUserPasswordDto {
  @ApiProperty({
    required: true,
  })
  password: string;
}
