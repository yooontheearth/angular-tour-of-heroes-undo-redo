import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap, take, first } from 'rxjs/operators';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import * as HeroActions from './hero.actions'
import { selectHeroes } from './hero.selectors';

@Injectable()
export class Heroffects {

loadHeroes$ = createEffect(() => this.actions$.pipe(
    ofType(HeroActions.getHeroes),
    mergeMap(() => this.heroService.getHeroes().pipe(
                    tap(_ => this.messageService.add('fetched heroes in an effect')),
                    map(heroes => HeroActions.getHeroesSuccess({ heroes })),
                    catchError(() => EMPTY)
                )
    )
)); 

addHero$ = createEffect(() => this.actions$.pipe(
    ofType(HeroActions.addHero),
    mergeMap((action) => this.store.select(selectHeroes).pipe(
            take(1),
            map(heroes => [...heroes, action.hero]),
            mergeMap(heroes => this.heroService.save(heroes)),
            map(heroes => HeroActions.getHeroes())
        )
    )
)); 

deleteHero$ = createEffect(() => this.actions$.pipe(
    ofType(HeroActions.deleteHero),
    mergeMap((action) => this.store.select(selectHeroes).pipe(
        take(1),
        map(heroes => heroes.filter(h => h.id !== action.id)),
        mergeMap(heroes => this.heroService.save(heroes)),
        map(heroes => HeroActions.getHeroes())
    ))
)); 

updateHero$ = createEffect(() => this.actions$.pipe(
    ofType(HeroActions.updateHero),
    mergeMap((action) => this.store.select(selectHeroes).pipe(
        take(1),
        map(heroes => heroes.map(h => h.id === action.hero.id ? action.hero : h)),
        mergeMap(heroes => this.heroService.save(heroes)),
        map(heroes => HeroActions.getHeroes())
    ))
)); 

  constructor(
    private store:Store,
    private actions$: Actions,
    private heroService: HeroService,
    private messageService: MessageService
  ) {}
}