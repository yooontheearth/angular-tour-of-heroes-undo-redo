import { Component, OnInit } from '@angular/core';
import { Hero, HeroType } from '../hero';
import { StoreService } from '../store.service';
import { MessageService } from '../message.service';
import { DestroyableComponent } from '../destroyable.component'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent extends DestroyableComponent implements OnInit {
  heroes:Hero[] = [];
  HeroType=HeroType;

  constructor(private storeService:StoreService, private messageService:MessageService) { 
    super();
  }
  
  getHeroes(): void {
    this.storeService.getHeroesKeepingUpdated()
        .pipe((s) => this.unsubscribeOnDestroy(s))
        .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name:string):void{
    name = name.trim();
    if(!name) {
      return;     
    }
    const type = HeroType.Classical;
    this.storeService.addHero({ name, type } as Hero);
  }

  delete(hero:Hero):void{
    this.storeService.deleteHero(hero.id);
  }
}
