import { createReducer, on } from "@ngrx/store";

import * as HeroActions from './hero.actions';
import { Hero } from "../hero";

export const initialState:ReadonlyArray<Hero> = [];

export const heroReducer = createReducer(
    initialState,
    on(HeroActions.getHeroesSuccess, (state, { heroes }) => heroes),
    on(HeroActions.addHeroSuccess, (state, { hero }) => [...state, hero]),
    on(HeroActions.deleteHeroSuccess, (state, { id }) => state.filter(h => h.id !== id)),
    on(HeroActions.updateHeroSuccess, (state, { hero }) => {
        return state.map(h => h.id === hero.id ? hero : h);
    }),
);
