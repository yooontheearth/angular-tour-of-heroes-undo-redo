import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject , Subject, of, identity, switchMap } from 'rxjs';
import { take, takeUntil, filter, tap, map, pipe } from 'rxjs';
import { tag } from 'rxjs-spy/operators';
import { AddHeroCommand, DeleteHeroCommand, Command, UpdateHeroCommand } from './command';

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

  getHero(id: number): Observable<Hero | undefined> {
    // TODO : Fix returning an empty hero when a detail page is requested first
    return this.getHeroesKeepingUpdated(true).pipe(
                    map(heroes => heroes.find(h => h.id === id))
                  );
  }

  addHero(hero:Hero):Observable<Hero>{
    const command = new AddHeroCommand(hero, this.heroService, this);
    return this.undoRedoService.execute(command);
  }

  addHeroToLocalStore(hero:Hero):void{
    // Cache a cloned one
    this.cachedHeroes.push({...hero});
    this.notifyHeroes();
  }

  deleteHero(id:number):Observable<Hero>{
    return this.getHero(id).pipe(
                  filter(hero => !!hero),
                  map(hero => hero as Hero),
                  switchMap(hero => {
                      const command = new DeleteHeroCommand(hero, this.heroService, this);
                      return this.undoRedoService.execute(command);
                    })
                );      
  }

  deleteHeroFromLocalStore(id:number):void{
    this.cachedHeroes = this.cachedHeroes.filter(h => h.id !== id);
    this.notifyHeroes();
  }  

  updateHero(hero:Hero):Observable<any>{
    return this.getHero(hero.id).pipe(
                  filter(hero => !!hero),
                  map(hero => hero as Hero),
                  switchMap(old => {
                      const command = new UpdateHeroCommand(old, Object.assign({}, hero), this.heroService, this);
                      return this.undoRedoService.execute(command);
                    })
                 );
  }

  updateHeroOnLocalStore(hero:Hero):void{
    // Update a hero in the cached heroes with a cloned one
    this.cachedHeroes[this.cachedHeroes.findIndex(h => h.id === hero.id)] = {...hero};
    this.notifyHeroes();
  }

  private notifyHeroes(){
    this.heroes$.next(this.cachedHeroes);
  }
  
  private log(message:string){
    this.messageService.add(`StoreService: ${message}`);
  }

}
