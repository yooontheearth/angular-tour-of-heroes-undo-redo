import { Component, OnInit, Input } from '@angular/core';
import { Hero, HeroType } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StoreService } from '../store.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero? : Hero;
  HeroType = Object.entries(HeroType).filter(h => typeof h[1] === 'number');

  constructor(private route: ActivatedRoute, 
            private storeService: StoreService,
            private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // make a clone of the retrieved hero to avoid modifying data on the store before a saving action
    this.storeService.getHero(id).subscribe(hero => this.hero = {...hero} as Hero);
  }

  goBack(): void {
    this.location.back();
  }

  save():void{
    if(this.hero){
      this.storeService.updateHero(this.hero)
                  .subscribe(() => this.goBack());
    }
  }
}
