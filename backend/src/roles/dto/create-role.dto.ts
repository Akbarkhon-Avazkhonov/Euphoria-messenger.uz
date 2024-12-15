import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Менеджер',
    description: 'Название роли',
  })
  name: string;
  @ApiProperty({
    example: 'Роль для менеджера',
    description: 'Описание роли',
  })
  description?: string;
  @ApiProperty({
    example: {
      can_manage_user: true,
      can_write: true,
      can_read: true,
      can_delete: true,
      can_send_audio: true,
      can_read_audio: true,
      can_send_video: true,
      can_read_video: true,
      can_send_photo: true,
      can_read_photo: true,
      can_send_file: true,
      can_read_file: true,
    },
    description: 'Права доступа',
  })
  access: {
    //  User
    can_manage_user: boolean;
    //  Chat
    can_write: boolean;
    can_read: boolean;
    can_delete: boolean;
    //  Audio
    can_send_audio: boolean;
    can_read_audio: boolean;
    //  Video
    can_send_video: boolean;
    can_read_video: boolean;
    //  Image
    can_send_photo: boolean;
    can_read_photo: boolean;
    //  File
    can_send_file: boolean;
    can_read_file: boolean;
    // Group
  };
}
