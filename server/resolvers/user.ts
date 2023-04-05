import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import {
    LoginInput,
    LoginResponse,
    SignUpInput,
    UserResponse,
} from '@schemas/user';
import UserService from '@services/user';
import { Context } from 'server/types/context';

@Resolver()
export default class UserResolver {
    constructor(private userService: UserService) {
        this.userService = new UserService();
    }

    @Mutation(() => UserResponse)
    async signupUser(@Arg('input') input: SignUpInput, @Ctx() ctx: Context) {
        return this.userService.signUpUser(input, ctx);
    }

    @Mutation(() => LoginResponse)
    async loginUser(@Arg('input') loginInput: LoginInput, @Ctx() ctx: Context) {
        return this.userService.loginUser(loginInput, ctx);
    }

    @Query(() => UserResponse)
    async getMe(@Ctx() ctx: Context) {
        return this.userService.getMe(ctx);
    }

    @Query(() => LoginResponse)
    async refreshAccessToken(@Ctx() ctx: Context) {
        return this.userService.refreshAccessToken(ctx);
    }

    @Query(() => Boolean)
    async logoutUser(@Ctx() ctx: Context) {
        return this.userService.logoutUser(ctx);
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg('id') id: string, @Ctx() ctx: Context) {
        return this.userService.deleteUser(id, ctx);
    }
}
