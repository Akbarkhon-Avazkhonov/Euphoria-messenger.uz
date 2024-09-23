import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
  @ApiProperty({
    required: false,
  })
  role?: string;
}
