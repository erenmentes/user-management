import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import type { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {};

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto : SignInDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    };

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(@Body() signInDto : SignInDto) {
        return this.authService.signUp(signInDto);
    };

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    };
};
