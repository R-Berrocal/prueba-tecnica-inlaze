import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { HandleExceptionsService } from 'src/handle-exceptions/handle-exceptions.service';

@Injectable()
export class RolesService {
  private logger: Logger = new Logger(RolesService.name);
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly handleExceptionService: HandleExceptionsService,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create(createRoleDto);
      return await this.roleRepository.save(role);
    } catch (error) {
      this.logger.error(error);
      this.handleExceptionService.handleExceptions(error);
    }
  }

  async findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: string) {
    const role = await this.roleRepository.findOne({
      where: { id, is_deleted: false },
    });
    if (!role) {
      throw new NotFoundException(`Role with id: ${id} not found`);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    updateRoleDto.name = updateRoleDto.name.toLocaleUpperCase();
    await this.findOne(id);
    try {
      await this.roleRepository.update({ id }, updateRoleDto);
      return {
        msg: `role with: ${id}. Update successfully `,
      };
    } catch (error) {
      this.logger.error(error);
      this.handleExceptionService.handleExceptions(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      await this.roleRepository.update(id, { is_deleted: true });
      return {
        msg: `role with: ${id}. Delete successfully `,
      };
    } catch (error) {
      this.logger.error(error);
      this.handleExceptionService.handleExceptions(error);
    }
  }
}
