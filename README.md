# An undo redo sample

This project is based on a tutorial application of Angular [Tour of Heroes](https://angular.io/tutorial) to show how to implement an undo redo feature with several different ways.

The original sample, Tour of heroes, is very simple because it's a tutorial. Each component requests a backend via a hero service directly, but that doesn't work well for an undo redo feature. We need a local store to track how data is changed. So I added a select option to a hero type, then added a store service, then implemented an undo redo feature with a command pattern. 

After that, re-implemented an undo redo feature with NgRX, which is a very popular state management framework, by a command pattern. But it's not fully NgRX way because an undo redo feature by a command pattern and NgRX action and effect didin't go well, so an undo redo service didn't use NgRX store. 

Lastly I implemented an undo redo feature by a memento pattern and this is fully NgRX way. For this, I had to re-work a hero service to delete/insert whole heroes every time.

There are several tags. Each one is at a certain point of this project.
 - HeroTypeAdded (Added a select option on a hero type - no undo redo feature yet)
 - StoreServiceAdded (Added a local store service on top of HeroTypeAdded - no undo redo feature yet)
 - **UndoRedoByCommandPattern (Added an undo redo feature by a command pattern on top of StoreServiceAdded)**
 - NgRxAdded (Added NgRX instead of a store service on top of HeroTypeAdded - no undo redo feature yet)
 - **UndoRedoByCommandPatternWithNgRx (Added an undo redo feature by a command pattern with NgRX on top of NgRxAdded)**
 - **UndoRedoByMementoPatternWithNgRx (Added an undo redo feature by a memento pattern with NgRX on tweaking of UndoRedoByCommandPatternWithNgRx)**

## Blog Posts

These are my blog posts (In Japanese).  日本語の解説ブログは以下。  
[https://my-clip-devdiary.blogspot.com/2022/03/angular-undo-redo.html](https://my-clip-devdiary.blogspot.com/2022/03/angular-undo-redo.html)  
[https://my-clip-devdiary.blogspot.com/2022/03/angular-undo-redo_6.html](https://my-clip-devdiary.blogspot.com/2022/03/angular-undo-redo_6.html)  
[https://my-clip-devdiary.blogspot.com/2022/03/undo-redo-angular-3.html](https://my-clip-devdiary.blogspot.com/2022/03/undo-redo-angular-3.html)

## How to build

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

