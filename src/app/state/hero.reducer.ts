import { createReducer, on } from "@ngrx/store";

import * as HeroActions from './hero.actions';
import { Hero } from "../hero";

export const initialState:ReadonlyArray<Hero> = [];

export const heroReducer = createReducer(
    initialState,
    on(HeroActions.getHeroesSuccess, (state, { heroes}) => heroes)
);
