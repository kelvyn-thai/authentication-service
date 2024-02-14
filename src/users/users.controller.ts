import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CarehealthUserPolicy } from '@src/authorization/policy/carehealth-user.policy';
import { Permission } from '@src/authorization/types/permissions.type';
import { Permissions } from '@src/authorization/decorators/permission.decorator';
import { Policies } from '@src/authorization/decorators/policies.decorator';
import { Auth } from '@src/authentication/decorators/auth.decorators';
import { AuthType } from '@src/authentication/enum/auth-type.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Auth(AuthType.Bearer, AuthType.ApiKey)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Permissions([Permission.Read, Permission.Create])
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Roles([Role.Admin, Role.Partner])
  // @Permissions([
  //   Permission.Read,
  //   Permission.Create,
  //   Permission.Update,
  //   Permission.Delete,
  // ])
  @Policies(new CarehealthUserPolicy())
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Permissions([Permission.Read])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('id', id);
    return await this.usersService.findOne(id);
  }

  @Permissions([Permission.Read, Permission.Update])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Permissions([Permission.Read, Permission.Delete])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
