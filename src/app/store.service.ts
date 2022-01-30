import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject , Subject, of } from 'rxjs';
import { tap, map } from 'rxjs';
import { tag } from 'rxjs-spy/operators';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private cachedHeroes!: Hero[];

  // To send only a latest value, use BehaviorSubject instead of Subject
  private heroes$ = new BehaviorSubject<Hero[]>([]);
  
  constructor(
    private heroService:HeroService,
    private messageService:MessageService) {   }

  getHeroes(): Observable<Hero[]> {
    if(!this.cachedHeroes){
      this.heroService.getHeroes().subscribe(heroes => {
        this.log('getHeroes fetched from db');
        this.cachedHeroes = heroes;
        this.notifyHeroes();
        });
    }           
    return this.heroes$.asObservable(); 
  }

  addHero(hero:Hero):void{
    this.heroService.addHero(hero)
              .subscribe(hero => {
                  this.cachedHeroes.push(hero);
                  this.notifyHeroes();
              });
  }

  deleteHero(id:number):void{
    this.heroService.deleteHero(id).subscribe(() => {
      this.cachedHeroes = this.cachedHeroes.filter(h => h.id !== id);
      this.notifyHeroes();
    });
  }

  getHero(id: number): Observable<Hero | undefined> {
    // no need to query to the db
    return this.getHeroes().pipe(
                    map(heroes => heroes.find(h => h.id === id) )
                  );
  }

  updateHero(hero:Hero):Observable<any>{
    return this.heroService.updateHero(hero).pipe(
                  tap(_ => {
                    // update the hero in the cached heroes
                    this.cachedHeroes[this.cachedHeroes.findIndex(h => h.id === hero.id)] = hero;
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
