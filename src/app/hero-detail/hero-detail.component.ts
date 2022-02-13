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

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  hero? : Hero;
  HeroType = Object.entries(HeroType).filter(h => typeof h[1] === 'number');

  subscription = new Subscription();

  constructor(private route: ActivatedRoute, 
      private actionsSubject:ActionsSubject,
      private store: Store,
      private location: Location) { 
        
        this.subscription = this.actionsSubject.pipe(
          ofType(HeroActions.updateHeroSuccess)
        ).subscribe(() => { this.goBack() });
      }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.select(selectHero(id)).subscribe(h => {
      this.hero = {...h} as Hero;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save():void{
    if(this.hero){
      this.store.dispatch(HeroActions.updateHero({ hero:this.hero}));
    }
  }
}
