import { Component } from "@angular/core";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Observable, Subscription, tap } from "rxjs";
import { Hero } from "./hero";
import { HeroService } from "./hero.service";
import * as HeroActions from './state/hero.actions'

export interface Command<T>{
    execute():void;
    undo():void;
    redo():void;
    description:string;
}

export class AddHeroCommand implements Command<Hero>{
    description:string;
    hero:Hero;
    subscription!:Subscription;
    constructor(
        hero:Hero,
        private store: Store,
        private actionsSubject:ActionsSubject
        ){
            this.hero = {...hero} as Hero;  // Clone a state
            this.description = `Add ${hero.name}`;

             this.subscription = this.actionsSubject.pipe(
                ofType(HeroActions.addHeroSuccess)
              ).subscribe((props) => { 
                this.hero = {...props.hero};    // Retrieve a generated Id
                this.subscription.unsubscribe();
            });
        }
    execute(): void {
        this.store.dispatch(HeroActions.addHero({ hero:this.hero }));
    }
    undo(): void {
        this.store.dispatch(HeroActions.deleteHero({ id:this.hero.id }));
    }
    redo(): void {
        return this.execute();
    }    
}

export class DeleteHeroCommand implements Command<Hero>{
    description:string;
    constructor(
        private hero:Hero,
        private store: Store
        ){
            this.description = `Delete ${hero.name}`;
        }
    execute(): void {
        this.store.dispatch(HeroActions.deleteHero({ id:this.hero.id }));
    }
    undo(): void {
        this.store.dispatch(HeroActions.addHero({ hero:this.hero }));
    }
    redo(): void {
        return this.execute();
    }    
}

export class UpdateHeroCommand implements Command<Hero>{
    description:string;
    constructor(
        private oldHero:Hero,
        private newHero:Hero,
        private store: Store
        ){
            this.description = `Update ${oldHero.name} to ${newHero.name}`;
        }
    execute(): void {
        this.store.dispatch(HeroActions.updateHero({ hero:this.newHero}));
    }
    undo(): void {
        this.store.dispatch(HeroActions.updateHero({ hero:this.oldHero}));
    }
    redo(): void {
        return this.execute();
    }    
}

