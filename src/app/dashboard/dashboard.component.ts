import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

import { Hero } from '../hero';
import { StoreService } from '../store.service';
import { MessageService} from '../message.service';
import { DestroyableComponent } from '../destroyable.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent extends DestroyableComponent implements OnInit{
  heroes: Hero[] = [];

  constructor(
    private storeService: StoreService, 
    private messageService:MessageService) { 
      super();
    }

    ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.storeService.getHeroesKeepingUpdated()
                  .pipe((s) => this.unsubscribeOnDestroy(s))
                  .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}