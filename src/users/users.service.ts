import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HandleExceptionsService } from 'src/handle-exceptions/handle-exceptions.service';
import { RolesService } from 'src/roles/roles.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

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
      throw new NotFoundException(`User not found or Token not valid`);
    }

    if (user.is_deleted) {
      throw new UnauthorizedException('User is deleted, talk with an admin');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, authUser: User) {
    updateUserDto.email = updateUserDto.email.toLowerCase().trim();
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.findOne(id);
    this.validateUserAuth(id, authUser);
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

  async validateUser({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, is_deleted: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (email)');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid (password)');
    }

    if (user.is_deleted) {
      throw new UnauthorizedException('User is deleted, talk with an admin');
    }

    return user;
  }

  async remove(id: string, authUser: User) {
    await this.findOne(id);
    this.validateUserAuth(id, authUser);
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

  validateUserAuth(idUser: string, authUser: User) {
    if (idUser !== authUser.id && authUser.role.name !== ValidRoles.ADMIN) {
      throw new UnauthorizedException('You do not have permissions');
    }
  }
}
