import { Component } from "@angular/core";
import { Hero } from "./hero";
import { HeroService } from "./hero.service";
import { StoreService } from "./store.service";

export interface Command{
    execute():void;
    undo():void;
    redo():void;
    description:string;
}

export class AddHeroCommand implements Command{
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
    execute(): void {
        this.heroService.addHero(this.hero)
              .subscribe(hero => {
                  this.hero.id = hero.id;   // We need a hero's ID to delete him/her later!
                  this.storeService.addHeroToLocalStore(hero);
              });
    }
    undo(): void {
        this.heroService.deleteHero(this.hero.id)
            .subscribe(() => {
                this.storeService.deleteHeroFromLocalStore(this.hero.id);
            });
    }
    redo(): void {
        this.execute();
    }    
}

export class DeleteHeroCommand implements Command{
    description:string;
    constructor(
        private hero:Hero,
        private heroService:HeroService,
        private storeService:StoreService
        ){
            this.description = `Delete ${hero.name}`;
        }
    execute(): void {
        this.heroService.deleteHero(this.hero.id)
            .subscribe(() => {
                this.storeService.deleteHeroFromLocalStore(this.hero.id);
            });
    }
    undo(): void {
        this.heroService.addHero(this.hero)
              .subscribe(hero => {
                  this.storeService.addHeroToLocalStore(hero);
              });
    }
    redo(): void {
        this.execute();
    }    
}

