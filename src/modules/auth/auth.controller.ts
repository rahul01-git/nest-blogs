import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExists } from 'src/core/guard/doesUserExist.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @UseGuards(DoesUserExists)
  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async authMe(@Request() req) {
    return await this.userService.findOneById(req.user.id);
  }
}
