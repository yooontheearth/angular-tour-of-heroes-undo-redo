import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Hero, HeroType } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as HeroActions from '../state/hero.actions';
import { Store } from '@ngrx/store';
import { ActionsSubject } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { selectHero } from '../state/hero.selectors';
import { UndoRedoService } from '../undo-redo.service';
import { UpdateHeroCommand } from '../command';
import { DestroyableComponent } from '../destoryable.component';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent extends DestroyableComponent implements OnInit {
  hero? : Hero;
  HeroType = Object.entries(HeroType).filter(h => typeof h[1] === 'number');

  private oldHero!:Hero;

  constructor(private route: ActivatedRoute, 
      private actionsSubject:ActionsSubject,
      private undoRedoService:UndoRedoService,
      private store: Store,
      private location: Location) { 
        super();

        this.actionsSubject.pipe(
          ofType(HeroActions.updateHeroSuccess),
          (s) => this.unsubscribeOnDestroy(s)
        ).subscribe(() => { this.goBack() });
      }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.select(selectHero(id)).pipe(
      (s) => this.unsubscribeOnDestroy(s)
    ).subscribe(h => {
      if(!h){
        this.store.dispatch(HeroActions.getHeroes());
      }else{
        this.hero = {...h} as Hero;
        this.oldHero = {...h};
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  save():void{
    if(this.hero){
      this.undoRedoService.execute(new UpdateHeroCommand(this.oldHero, this.hero, this.store));
    }
  }
}
