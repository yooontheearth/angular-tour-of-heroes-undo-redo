import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectHeroRedoable, selectHeroRedoStack, selectHeroUndoable, selectHeroUndoStack } from '../state/hero.selectors';
import * as HeroActions from '../state/hero.actions';

@Component({
  selector: 'app-undo-redo',
  templateUrl: './undo-redo.component.html',
  styleUrls: ['./undo-redo.component.css']
})
export class UndoRedoComponent implements OnInit {

  isRedoable=this.store.select(selectHeroRedoable);
  isUndoable=this.store.select(selectHeroUndoable);
  undoStack=this.store.select(selectHeroUndoStack);
  redoStack=this.store.select(selectHeroRedoStack);

  constructor(
    private store:Store
    ) { }

  ngOnInit(): void {
  }
  undo():void{
    this.store.dispatch(HeroActions.undo());
  }
  redo():void{
    this.store.dispatch(HeroActions.redo());
  }
}
