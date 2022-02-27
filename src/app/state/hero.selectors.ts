import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UndoRedoState } from "./hero.reducer";

export const selectUndoableHeroes = createFeatureSelector<UndoRedoState>('heroes');
export const selectCurrentHeroes = createSelector(
    selectUndoableHeroes,
    (app) => app.current
);
export const selectHero = (id:number) => createSelector(
    selectCurrentHeroes,
    (heroes) => heroes.find(h => h.id === id)
);
export const selectHeroUndoable = createSelector(
    selectUndoableHeroes,
    (app) => app.isUndoable
);
export const selectHeroRedoable = createSelector(
    selectUndoableHeroes,
    (app) => app.isRedoable
);
export const selectHeroUndoStack = createSelector(
    selectUndoableHeroes,
    (app) => app.undoStack
);
export const selectHeroRedoStack = createSelector(
    selectUndoableHeroes,
    (app) => app.redoStack
);
