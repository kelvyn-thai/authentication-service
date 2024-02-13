import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { ActiveUser } from '@src/authentication/decorators/active-user.decorator';
// import { ActiveUserData } from '@src/authentication/interface/active-user.interface';
// import { Roles } from '@src/authorization/decorators/roles.decorators';
// import { Role } from './enums/role.enum';
import { Permissions } from '@src/authorization/decorators/permission.decorator';
import { Permission } from '@src/authorization/types/permissions.type';
import { Policies } from '@src/authorization/decorators/policies.decorator';
import { FrameworkContributorPolicy } from '@src/authorization/policy/framework-contributor.policy';

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
  @Policies(new FrameworkContributorPolicy())
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
