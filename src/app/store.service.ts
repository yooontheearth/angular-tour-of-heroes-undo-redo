import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject , Subject, of, identity } from 'rxjs';
import { take, takeUntil, filter, tap, map, pipe } from 'rxjs';
import { tag } from 'rxjs-spy/operators';
import { AddHeroCommand, DeleteHeroCommand, Command } from './command';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { UndoRedoService } from './undo-redo.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private cachedHeroes!: Hero[];

  // To send only a latest value, use BehaviorSubject instead of Subject
  private heroes$ = new BehaviorSubject<Hero[]>([]);
  
  constructor(
    private heroService:HeroService,
    private messageService:MessageService,
    private undoRedoService:UndoRedoService) {   }

  getHeroesKeepingUpdated(onlyOnce:boolean=false): Observable<Hero[]> {
    if(!this.cachedHeroes){
      this.heroService.getHeroes().subscribe(heroes => {
        this.log('getHeroes fetched from db');
        this.cachedHeroes = heroes;
        this.notifyHeroes();
      });
    }           
    // Return a cloned array
    return this.heroes$.pipe(
          (onlyOnce ? take(1) : identity),  // Notify only once or keep updated
          map(heroes => [...heroes.map(h => Object.assign({}, h))])
        ); 
  }

  addHero(hero:Hero):void{
    const command = new AddHeroCommand(hero, this.heroService, this);
    this.undoRedoService.execute(command);
  }

  addHeroToLocalStore(hero:Hero):void{
    // Cache a cloned one
    this.cachedHeroes.push({...hero});
    this.notifyHeroes();
  }

  deleteHero(id:number):void{
    this.getHero(id).subscribe(hero => {
      if(hero){
        const command = new DeleteHeroCommand(hero, this.heroService, this);
        this.undoRedoService.execute(command);
      }      
    });   
  }

  deleteHeroFromLocalStore(id:number):void{
    this.cachedHeroes = this.cachedHeroes.filter(h => h.id !== id);
    this.notifyHeroes();
  }

  getHero(id: number): Observable<Hero | undefined> {
    // If the heroes are not yet cached by the time this method is called, the default empty array will be emitted by BehaviroSubject.
    // That means a hero will be null in that case... Leave it as it is because this is a sample app :p
    return this.getHeroesKeepingUpdated(true).pipe(
                    map(heroes => heroes.find(h => h.id === id))
                  );
  }

  updateHero(hero:Hero):Observable<any>{
    // update command

    return this.heroService.updateHero(hero)
            .pipe(
              tap(_ => {
                // Update a hero in the cached heroes with a cloned one
                this.cachedHeroes[this.cachedHeroes.findIndex(h => h.id === hero.id)] = {...hero};
                this.notifyHeroes();
             }));
  }

  private notifyHeroes(){
    this.heroes$.next(this.cachedHeroes);
  }
  
  private log(message:string){
    this.messageService.add(`StoreService: ${message}`);
  }

}
