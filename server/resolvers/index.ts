import RecipeResolver from './recipe';
import ReviewResolver from './review';
import UserResolver from './user';

export default [UserResolver, RecipeResolver, ReviewResolver] as const;
