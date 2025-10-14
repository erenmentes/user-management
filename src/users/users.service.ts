import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    private readonly Users : Array<UserDto> = [
        {
            userId : 1,
            username : 'eren',
            password : 'mentes'
        },
        {
            userId : 2,
            username : 'yusuf',
            password : 'mentes'
        },
    ];

    async findOne(username : string) : Promise<UserDto | undefined> {
        return this.Users.find(user => user.username === username);
    };
}
