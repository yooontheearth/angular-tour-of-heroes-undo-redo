import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo  } from 'angular-in-memory-web-api';
import { Hero, HeroType } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService  implements InMemoryDbService{

  constructor() { }

  createDb(reqInfo?:RequestInfo ) {
    let heroes = [
      { id: 11, name: 'Dr Nice', type:HeroType.Classical },
      { id: 12, name: 'Narco', type:HeroType.Anti },
      { id: 13, name: 'Bombasto', type:HeroType.Tragic },
      { id: 14, name: 'Celeritas', type:HeroType.Classical },
      { id: 15, name: 'Magneta', type:HeroType.Anti },
      { id: 16, name: 'RubberMan', type:HeroType.Tragic },
      { id: 17, name: 'Dynama', type:HeroType.Classical },
      { id: 18, name: 'Dr IQ', type:HeroType.Anti },
      { id: 19, name: 'Magma', type:HeroType.Tragic },
      { id: 20, name: 'Tornado', type:HeroType.Classical }
    ];

    if(!!reqInfo && reqInfo.collectionName === 'resetDb')
      heroes = [];
    return  {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
