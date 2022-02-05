import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Command } from './command';

@Injectable({
  providedIn: 'root'
})
export class UndoRedoService {

  private isRedoable$ = new BehaviorSubject<boolean>(false);
  private isUndoable$ = new BehaviorSubject<boolean>(false);

  undoStack: Array<Command<any>> = [];
  redoStack: Array<Command<any>> = [];

  constructor() { }

  getRedoable():Observable<boolean>{
    return this.isRedoable$.asObservable();
  }
  getUndoable():Observable<boolean>{
    return this.isUndoable$.asObservable();
  }

  execute<T>(command:Command<T>):Observable<T>{
    return command.execute().pipe(
      tap(_ => {
        this.undoStack.unshift(command);
        this.redoStack.length = 0;
        this.updateStacks();
      })
    );    
  }
  undo<T>():Observable<T>{
    const command = this.undoStack.shift();
    if(command){
      return command.undo().pipe(
        tap(_ => {
          this.redoStack.unshift(command);
          this.updateStacks();
        }));
    }
    return of();
  }
  redo<T>():Observable<T>{
    const command = this.redoStack.shift();
    if(command){
      return command.redo().pipe(
        tap(_ => {
          this.undoStack.unshift(command);
          this.updateStacks();
        }));
    }
    return of();
  }
  private updateStacks(){
    this.isUndoable$.next(this.undoStack.length > 0);
    this.isRedoable$.next(this.redoStack.length > 0);
  }
}
