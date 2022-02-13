import { Component, OnInit } from '@angular/core';
import { Hero, HeroType } from '../hero';
import { MessageService } from '../message.service';
import { Store } from '@ngrx/store';
import { selectHeroes } from '../state/hero.selectors';
import * as HeroActions from '../state/hero.actions'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes$ = this.store.select(selectHeroes);
  HeroType=HeroType;

  constructor(private store: Store, private messageService:MessageService) { }
  
  ngOnInit(): void {
    this.store.dispatch(HeroActions.getHeroes());
  }

  add(name:string):void{
    name = name.trim();
    if(!name) {
      return;     
    }
    const type = HeroType.Classical;
    const hero = { name, type } as Hero;
    this.store.dispatch(HeroActions.addHero({ hero }));
  }

  delete(hero:Hero):void{
    this.store.dispatch(HeroActions.deleteHero({ id:hero.id }));
  }
}
