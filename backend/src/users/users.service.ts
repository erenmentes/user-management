import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { User, UserDocument } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {};

    async findOne(username : string) : Promise<UserDto | null> {
        return await this.userModel.findOne({username : username});
    };

    async signUp(user : Object) {
        return await this.userModel.create(user);
    };
}
