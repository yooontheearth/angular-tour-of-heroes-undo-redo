import { createAction, props } from '@ngrx/store';
import { Hero } from '../hero';

export const addHero = createAction(
  '[Heroes] Add Hero',
  props<{ hero:Hero }>()
);
export const updateHero = createAction(
    '[Heroes] Updagte Hero',
    props<{ hero:Hero }>()
  );
export const deleteHero = createAction(
  '[Heroes] Delete Hero',
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
export const saveSuccess =  createAction(
  '[Heroes] Save Success',
  props<{ originalType:string, heroes:ReadonlyArray<Hero>}>()
);
export const undo =  createAction(
  '[Heroes] Undo'
);
export const redo =  createAction(
  '[Heroes] Redo'
);
export const undoSuccess =  createAction(
  '[Heroes] Undo Success'
);
export const redoSuccess =  createAction(
  '[Heroes] Redo Success'
);


  
