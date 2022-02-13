import { createAction, props } from '@ngrx/store';
import { Hero } from '../hero';

export const addHero = createAction(
  '[Heroes] Add Hero',
  props<{ hero:Hero }>()
);
export const addHeroSuccess = createAction(
    '[Heroes] Add Hero Success',
    props<{ hero:Hero }>()
  );
export const updateHero = createAction(
    '[Heroes] Updagte Hero',
    props<{ hero:Hero }>()
  );
  export const updateHeroSuccess = createAction(
    '[Heroes] Updagte Hero Success',
    props<{ hero:Hero }>()
  );
export const deleteHero = createAction(
  '[Heroes] Delete Hero',
  props<{ id:number }>()
);
export const deleteHeroSuccess = createAction(
    '[Heroes] Delete Hero Success',
    props<{ id:number }>()
  );

export const searchHeroes = createAction(
    '[Heroes] Search Heroes',
    props<{ term:string }>()
  );
  export const searchHeroesSuccess = createAction(
    '[Heroes] Search Heroes Success',
    props<{ term:string }>()
  );

export const getHeroes =  createAction(
    '[Heroes] Get Heroes'
  );
  export const getHeroesSuccess =  createAction(
    '[Heroes] Get Heroes Success',
    props<{ heroes:ReadonlyArray<Hero>}>()
  );
