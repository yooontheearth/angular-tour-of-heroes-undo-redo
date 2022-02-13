import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Hero } from "../hero";

export const selectHeroes = createFeatureSelector<ReadonlyArray<Hero>>('heroes');

export const selectHero = (id:number) => createSelector(
    selectHeroes,
    (heroes) => heroes.find(h => h.id === id)
);
