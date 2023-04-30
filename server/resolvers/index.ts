import RatingResolver from './rating';
import RecipeResolver from './recipe';
import ReviewResolver from './review';
import UserResolver from './user';

export default [
    UserResolver,
    RatingResolver,
    RecipeResolver,
    ReviewResolver,
] as const;
