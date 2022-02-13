import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Hero } from "../hero";

export const selectHeroes = createFeatureSelector<ReadonlyArray<Hero>>('heroes');
