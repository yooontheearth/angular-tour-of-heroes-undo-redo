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
    // this.heroService.addHero({ name, type } as Hero)
    //               .subscribe(hero => {
    //                   this.heroes.push(hero);
    //               });
  }

  delete(hero:Hero):void{
    // this.heroes = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHero(hero.id).subscribe();
  }
}
