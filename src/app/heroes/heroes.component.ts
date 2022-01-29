import { Component, OnInit } from '@angular/core';
import { Hero, HeroType } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:Hero[] = [];
  HeroType=HeroType;

  constructor(private heroService: HeroService, private messageService:MessageService) { }
  
  getHeroes(): void {
    this.messageService.add('HeroesComponent getHeroes');
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
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
    this.heroService.addHero({ name, type } as Hero)
                  .subscribe(hero => {
                      this.heroes.push(hero);
                  });
  }

  delete(hero:Hero):void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
