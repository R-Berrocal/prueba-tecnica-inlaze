import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HandleExceptionsService } from 'src/handle-exceptions/handle-exceptions.service';
import { RolesService } from 'src/roles/roles.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly handleExceptionService: HandleExceptionsService,
  ) {}

  async create({ password, role_id, ...userDto }: CreateUserDto) {
    try {
      const user = this.userRepository.create({
        ...userDto,
        password: bcrypt.hashSync(password, 10),
        role: role_id
          ? await this.rolesService.findOne(role_id)
          : await this.rolesService.findOneByName('USER'),
      });
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      this.logger.error(error);
      this.handleExceptionService.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    if (user.is_deleted) {
      throw new NotFoundException(`User with id: ${id} is deleted`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    try {
      await this.userRepository.update({ id }, updateUserDto);
      return {
        msg: `User with: ${id}. Update successfully `,
      };
    } catch (error) {
      this.logger.error(error);
      this.handleExceptionService.handleExceptions(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      await this.userRepository.update(id, { is_deleted: true });
      return {
        msg: `User with: ${id}. Delete successfully `,
      };
    } catch (error) {
      this.logger.error(error);
      this.handleExceptionService.handleExceptions(error);
    }
  }
}
