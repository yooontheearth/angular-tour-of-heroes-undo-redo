import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { StoreService } from '../store.service';
import { MessageService} from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private storeService: StoreService, 
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.messageService.add('DashboardComponent getHeroes');
    this.storeService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}