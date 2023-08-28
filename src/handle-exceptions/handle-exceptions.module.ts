import { Module } from '@nestjs/common';
import { HandleExceptionsService } from './handle-exceptions.service';

@Module({
  providers: [HandleExceptionsService],
  exports: [HandleExceptionsService],
})
export class HandleExceptionsModule {}
