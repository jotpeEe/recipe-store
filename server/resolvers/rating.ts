import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { RatingDeleteResponse, RatingResponse } from '@schemas/rating';
import RatingService from '@services/rating';
import { type Context } from 'server/types/context';

@Resolver()
export default class RatingResolver {
    constructor(private ratingService: RatingService) {
        this.ratingService = new RatingService();
    }

    @Mutation(() => RatingResponse)
    async createRating(
        @Arg('input') input: number,
        @Arg('id') id: string,
        @Ctx() ctx: Context
    ) {
        return this.ratingService.createRating(input, id, ctx);
    }

    @Mutation(() => RatingResponse)
    async updateRating(
        @Arg('id') id: string,
        @Arg('input') input: number,
        @Ctx() ctx: Context
    ) {
        return this.ratingService.updateRating(id, input, ctx);
    }

    @Mutation(() => RatingDeleteResponse)
    async deleteRating(@Arg('id') id: string, @Ctx() ctx: Context) {
        return this.ratingService.deleteRating(id, ctx);
    }
}
