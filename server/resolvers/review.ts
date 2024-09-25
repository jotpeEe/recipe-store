import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import {
    ReviewListResponse,
    ReviewPopulatedResponse,
    ReviewResponse,
} from '@schemas/review';
import ReviewService from '@services/review';
import { type Context } from 'server/types/context';

@Resolver()
export default class ReviewResolver {
    constructor(private reviewService: ReviewService) {
        this.reviewService = new ReviewService();
    }

    @Mutation(() => ReviewResponse)
    async createReview(
        @Arg('input') input: string,
        @Arg('id') id: string,
        @Ctx() ctx: Context
    ) {
        return this.reviewService.createReview(input, id, ctx);
    }

    @Query(() => ReviewListResponse)
    async getReviewsBy(
        @Arg('id', { nullable: true }) id?: string,
        @Arg('author', { nullable: true }) author?: string
    ) {
        return this.reviewService.getReviewsBy(id, author);
    }

    @Query(() => ReviewListResponse)
    async getMyReviews(@Ctx() ctx: Context) {
        return this.reviewService.getMyReviews(ctx);
    }

    @Query(() => ReviewListResponse)
    async getLastReviews(@Arg('limit', { nullable: true }) limit?: number) {
        return this.reviewService.getLastReviews(limit);
    }

    @Mutation(() => ReviewResponse)
    async updateReview(
        @Arg('id') id: string,
        @Arg('input') input: string,
        @Ctx() ctx: Context
    ) {
        return this.reviewService.updateReview(id, input, ctx);
    }

    @Mutation(() => ReviewPopulatedResponse)
    async deleteReview(
        @Arg('id') id: string,
        @Arg('recipeId') recipeId: string,
        @Ctx() ctx: Context
    ) {
        return this.reviewService.deleteReview(id, recipeId, ctx);
    }
}
