import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UndoRedoService } from '../undo-redo.service';

@Component({
  selector: 'app-undo-redo',
  templateUrl: './undo-redo.component.html',
  styleUrls: ['./undo-redo.component.css']
})
export class UndoRedoComponent implements OnInit {

  isRedoable!:Observable<boolean>;
  isUndoable!:Observable<boolean>;

  constructor(public undoRedoService:UndoRedoService) { }

  ngOnInit(): void {
    this.isRedoable = this.undoRedoService.getRedoable();
    this.isUndoable = this.undoRedoService.getUndoable();
  }
  undo():void{
    this.undoRedoService.undo().subscribe();
  }
  redo():void{
    this.undoRedoService.redo().subscribe();
  }
}
