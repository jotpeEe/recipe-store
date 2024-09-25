import React, { type FC } from 'react';

import { type RecipeProps } from '@lib/types';

import { RecipeCard } from './card';

type RecipeListProps = {
    recipes?: RecipeProps[];
    search?: string;
};

const RecipeList: FC<RecipeListProps> = ({ recipes }) => (
    <ul className={'grid grid-cols-fill gap-4'}>
        {recipes
            ? recipes.map(
                  ({ id, title, ratings, user, image, prep }, index) => (
                      <li key={index}>
                          <RecipeCard
                              recipe={{
                                  id,
                                  title,
                                  ratings,
                                  user,
                                  image,
                                  prep,
                              }}
                              variant="listitem"
                          />
                      </li>
                  )
              )
            : Array.from({ length: 9 }).map((_, index) => (
                  <li
                      key={index}
                      className="min-h-[150px] w-full rounded-xl bg-slate-100 p-4"
                  ></li>
              ))}
    </ul>
);

export default RecipeList;
