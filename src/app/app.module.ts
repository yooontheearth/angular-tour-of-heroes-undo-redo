import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { UndoRedoComponent } from './undo-redo/undo-redo.component';

import { StoreModule } from '@ngrx/store';
import { heroReducer, metaReducers } from './state/hero.reducer';
import { EffectsModule } from '@ngrx/effects';
import { Heroffects } from './state/hero.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    UndoRedoComponent
  ],
  imports: [    
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    StoreModule.forRoot({ heroes:heroReducer }, { metaReducers }),
    EffectsModule.forRoot([Heroffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
