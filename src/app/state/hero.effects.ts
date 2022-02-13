import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import * as HeroActions from './hero.actions'

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
    mergeMap((action) => this.heroService.addHero(action.hero).pipe(
                    tap(_ => this.messageService.add('add hero in an effect')),
                    map(hero => HeroActions.addHeroSuccess({ hero }))
                )
    )
)); 

deleteHero$ = createEffect(() => this.actions$.pipe(
    ofType(HeroActions.deleteHero),
    mergeMap((action) => this.heroService.deleteHero(action.id).pipe(
                    tap(_ => this.messageService.add('delete hero in an effect')),
                    map(id => HeroActions.deleteHeroSuccess( id ))
                )
    )
)); 

updateHero$ = createEffect(() => this.actions$.pipe(
    ofType(HeroActions.updateHero),
    mergeMap((action) => this.heroService.updateHero(action.hero).pipe(
                    tap(_ => this.messageService.add('update hero in an effect')),
                    map(hero => HeroActions.updateHeroSuccess({ hero }))
                )
    )
)); 

  constructor(
    private actions$: Actions,
    private heroService: HeroService,
    private messageService: MessageService
  ) {}
}