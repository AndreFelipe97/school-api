import { PartialType } from '@nestjs/swagger';
import { CreateUsersDto } from './createUsers.dto';

export class UpdateUsersDto extends PartialType(CreateUsersDto) {}
