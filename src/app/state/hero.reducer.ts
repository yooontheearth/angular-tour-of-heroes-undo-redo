import { Action, ActionReducer, createReducer, MetaReducer, on } from "@ngrx/store";

import * as HeroActions from './hero.actions';
import { Hero } from "../hero";

export interface UndoRedoItem{
    description:string,
    state:Array<Hero>
}

export interface UndoRedoState {
    isRedoable:boolean,
    isUndoable:boolean,
    current:Array<Hero>,
    undoStack:Array<UndoRedoItem>,
    redoStack:Array<UndoRedoItem>
}

export const initialState:UndoRedoState = {
    isRedoable:false,
    isUndoable:false,
    current:[],
    undoStack:[],
    redoStack:[]
};

export const heroReducer = createReducer(
    initialState,
    on(HeroActions.getHeroesSuccess,
       HeroActions.saveSuccess,
         (state, { heroes }) =>({
        ...state,
        current:[...heroes]
    })),
    on(HeroActions.undoSuccess,
          (state, { }) =>{
            const undoItem:UndoRedoItem = state.undoStack[0];
            const redoItem:UndoRedoItem = {
                description:undoItem.description,
                state:state.current.slice()
            };
            return {
                ...state,
                current:undoItem.state.slice(),
                isRedoable:true,
                isUndoable:state.undoStack.length > 1,
                redoStack:[redoItem, ...state.redoStack],
                undoStack:state.undoStack.slice(1)
            };
    }),
    on(HeroActions.redoSuccess,
        (state, { }) =>{
            const redoItem:UndoRedoItem = state.redoStack[0];
            const undoItem:UndoRedoItem = {
                description:redoItem.description,
                state:state.current.slice()
            };
            return {
                ...state,
                current:redoItem.state.slice(),
                isRedoable:state.redoStack.length > 1,
                isUndoable:true,
                redoStack:state.redoStack.slice(1),
                undoStack:[undoItem, ...state.undoStack]
            };
  })
);

export function saveActionMetaReducer(reducer: ActionReducer<{heroes:UndoRedoState}>): ActionReducer<{heroes:UndoRedoState}> {
    function save(state:{heroes:UndoRedoState}|undefined, action:Action){
        if(!state)
            return reducer(state, action);
        const wholeState = reducer(state, action);
        const heroesState = wholeState.heroes;
        const saveAction = action as {originalType:string, type:string};
        const item:UndoRedoItem = {
            description:saveAction.originalType,
            state:state.heroes.current.slice()
        };
        return {
            ...wholeState,
            heroes:{
                ...heroesState,
                isRedoable:false,
                isUndoable:true,
                redoStack:[],
                undoStack:[item, ...heroesState.undoStack]
            }
        };
    }

    return function(state, action) {
        switch(action.type){
            case HeroActions.saveSuccess.type:
               return save(state, action);
            default:
                return reducer(state, action);
        }
    };
  }

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action) {
      console.log('state action', state, action);
      return reducer(state, action);
    };
  }  
   
  export const metaReducers: MetaReducer<any>[] = [saveActionMetaReducer, debug];