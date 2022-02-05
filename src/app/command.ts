import { Component } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Hero } from "./hero";
import { HeroService } from "./hero.service";
import { StoreService } from "./store.service";

export interface Command<T>{
    execute():Observable<T>;
    undo():Observable<T>;
    redo():Observable<T>;
    description:string;
}

export class AddHeroCommand implements Command<Hero>{
    description:string;
    hero:Hero;
    constructor(
        hero:Hero,
        private heroService:HeroService,
        private storeService:StoreService
        ){
            this.hero = {...hero} as Hero;  // Clone a state
            this.description = `Add ${hero.name}`;
        }
    execute(): Observable<Hero> {
        return this.heroService.addHero(this.hero)
                    .pipe(
                        tap(hero => {
                            this.hero.id = hero.id;   // We need a hero's ID to delete him/her later!
                            this.storeService.addHeroToLocalStore(hero);
                        })
                    );
    }
    undo(): Observable<Hero> {
        return this.heroService.deleteHero(this.hero.id)
                    .pipe(
                        tap(_ => {
                            this.storeService.deleteHeroFromLocalStore(this.hero.id);
                        })
                    );
    }
    redo(): Observable<Hero> {
        return this.execute();
    }    
}

export class DeleteHeroCommand implements Command<Hero>{
    description:string;
    constructor(
        private hero:Hero,
        private heroService:HeroService,
        private storeService:StoreService
        ){
            this.description = `Delete ${hero.name}`;
        }
    execute(): Observable<Hero> {
        return this.heroService.deleteHero(this.hero.id)
                    .pipe(
                        tap(_ => {
                            this.storeService.deleteHeroFromLocalStore(this.hero.id);
                        })
                    );
    }
    undo(): Observable<Hero> {
        return this.heroService.addHero(this.hero)
                    .pipe(
                        tap(hero => {
                            this.storeService.addHeroToLocalStore(hero);
                        })
                    );
    }
    redo(): Observable<Hero> {
        return this.execute();
    }    
}

export class UpdateHeroCommand implements Command<Hero>{
    description:string;
    constructor(
        private oldHero:Hero,
        private newHero:Hero,
        private heroService:HeroService,
        private storeService:StoreService
        ){
            this.description = `Update ${oldHero.name} to ${newHero.name}`;
        }
    execute(): Observable<Hero> {
        return this.heroService.updateHero(this.newHero)
            .pipe(
              tap(_ => {
                this.storeService.updateHeroOnLocalStore(this.newHero);
             }));
    }
    undo(): Observable<Hero> {
        return this.heroService.updateHero(this.oldHero)
            .pipe(
              tap(_ => {
                this.storeService.updateHeroOnLocalStore(this.oldHero);
             }));        
    }
    redo(): Observable<Hero> {
        return this.execute();
    }    
}

