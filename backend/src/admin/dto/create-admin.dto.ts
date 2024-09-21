import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
}
