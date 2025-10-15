import { AuthService } from './auth.service';
import type { SignInDto } from './dto/signin.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
    }>;
    signUp(signInDto: SignInDto): Promise<import("mongoose").Document<unknown, {}, import("../users/schemas/users.schema").UserDocument, {}, {}> & import("../users/schemas/users.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getProfile(req: any): any;
}
