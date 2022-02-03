import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Command } from './command';

@Injectable({
  providedIn: 'root'
})
export class UndoRedoService {

  private isRedoable$ = new BehaviorSubject<boolean>(false);
  private isUndoable$ = new BehaviorSubject<boolean>(false);

  undoStack: Array<Command> = [];
  redoStack: Array<Command> = [];

  constructor() { }

  getRedoable():Observable<boolean>{
    return this.isRedoable$.asObservable();
  }
  getUndoable():Observable<boolean>{
    return this.isUndoable$.asObservable();
  }

  execute(command:Command):void{
    command.execute();
    this.undoStack.unshift(command);
    this.redoStack.length = 0;
    this.updateStacks();
  }
  undo():void{
    const command = this.undoStack.shift();
    if(command){
      command.undo();
      this.redoStack.unshift(command);
    }
    this.updateStacks();
  }
  redo():void{
    const command = this.redoStack.shift();
    if(command){
      command.redo();
      this.undoStack.unshift(command);
    }
    this.updateStacks();
  }
  private updateStacks(){
    this.isUndoable$.next(this.undoStack.length > 0);
    this.isRedoable$.next(this.redoStack.length > 0);
  }
}
