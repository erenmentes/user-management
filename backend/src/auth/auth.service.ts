import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(private usersService : UsersService, private jwtService : JwtService) {};

    async signIn (username : string, pass : string) : Promise<{access_token : string}>{
        const user = await this.usersService.findOne(username);

        if(user?.password != pass) {
            throw new UnauthorizedException();
        };

        const payload = {sub : user.userId, username : user.username};
        return {
            access_token : await this.jwtService.signAsync(payload)
        };
    };

    async signUp(signInDto : SignInDto) {
        const User = {
            username : signInDto.username,
            password : signInDto.password
        };
        return await this.usersService.signUp(User);
    };
};
