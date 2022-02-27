import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { forkJoin, Observable, of } from 'rxjs';
import { map, tap, catchError, switchMap, concatMap, mergeMap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers:new HttpHeaders({ 'Content-Type' : 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService:MessageService) { }
    
  getHeroes(): Observable<Hero[]> {
    const heroes = this.http.get<Hero[]>(this.heroesUrl)
              .pipe(
                  tap(_ => this.log('fetched heroes')),
                  catchError(this.handleError<Hero[]>('geHeroes', []))
              );
    return heroes;
  }

  save(heroes:Hero[]):Observable<any>{
    return this.http.post('commands/resetDb', { clear: true }).pipe(
      catchError(this.handleError<any>('save', [])),
      mergeMap(() => forkJoin(heroes.map(h => this.addHero(h))))
    );
  }
  
  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero:Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
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

  private log(message:string){
    this.messageService.add(`HeroService: ${message}`);
  }
}
