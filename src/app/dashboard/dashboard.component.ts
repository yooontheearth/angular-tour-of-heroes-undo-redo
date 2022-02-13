import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Hero } from '../hero';
import * as HeroActions from '../state/hero.actions';
import { MessageService} from '../message.service';
import { selectHeroes } from '../state/hero.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes:Hero[] = [];

  constructor(private store: Store, private messageService:MessageService) { }

  ngOnInit(): void {
    this.store.select(selectHeroes).subscribe(heroes => this.heroes = heroes.slice(1, 5));

    this.store.dispatch(HeroActions.getHeroes());
  }
}