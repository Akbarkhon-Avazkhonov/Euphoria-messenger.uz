import { Global, Module } from '@nestjs/common';
import { PgService } from './pg.service';

@Global() // Делаем модуль глобальным
@Module({
  providers: [PgService],
  exports: [PgService], // Экспортируем PgService для использования в других модулях
})
export class PgModule {}
