import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { HandleExceptionsModule } from 'src/handle-exceptions/handle-exceptions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), HandleExceptionsModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
