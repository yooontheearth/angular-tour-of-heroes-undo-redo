import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject , Subject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private cachedHeroes?: Hero[];

  constructor(
    private heroService:HeroService,
    private messageService:MessageService) {   }

    getHeroes(): BehaviorSubject<Hero[]> {
      this.log('getHeroes');
      if(!this.cachedHeroes){
        const subject = new BehaviorSubject<Hero[]>([]);
        this.heroService.getHeroes().subscribe(heroes => {
          this.log('fetched from db');
          this.cachedHeroes = heroes;
          subject.next(heroes);
         });
         return subject;
      }      
      this.log('fetched from cache');
      return new BehaviorSubject<Hero[]>(this.cachedHeroes);
    }
  /* 
  
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    const hero = this.http.get<Hero>(url).pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
    return hero;
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero:Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  updateHero(hero:Hero):Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
                .pipe(
                    tap(_ => this.log(`updated hero id=${hero.id}`)),
                    catchError(this.handleError<any>('updateHero'))
                );
  }

  deleteHero(id:number):Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term:string):Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result? : T){
    return (error:any):Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  
  */

  private log(message:string){
    this.messageService.add(`StoreService: ${message}`);
  }

}
