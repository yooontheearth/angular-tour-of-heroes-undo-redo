import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import * as HeroActions from './hero.actions'

@Injectable()
export class Heroffects {

//   loadMovies$ = createEffect(() => this.actions$.pipe(
//     ofType('[Movies Page] Load Movies'),
//     mergeMap(() => this.moviesService.getAll()
//       .pipe(
//         map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
//         catchError(() => EMPTY)
//       ))
//     )
//   );

loadHeroes$ = createEffect(() => this.actions$.pipe(
    ofType(HeroActions.getHeroes),
    mergeMap(() => this.heroService.getHeroes().pipe(
                    tap(_ => this.messageService.add('fetched heroes in an effect')),
                    map(heroes => HeroActions.getHeroesSuccess({ heroes }))
                )
    )
)); 

  constructor(
    private actions$: Actions,
    private heroService: HeroService,
    private messageService: MessageService
  ) {}
}