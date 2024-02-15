import { Component, OnDestroy, OnInit } from '@angular/core';

import { TodosFacadeService } from './lib';
import { Observable, Subject, catchError, takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()

  title = 'angular-tour-of-heroes';

  constructor(
    public readonly todosFacadeService: TodosFacadeService
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public createTodo() {
    this.todosFacadeService.createTodo({
      title: 'New Todo',
      description: 'This is a new todo'
    }).pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        console.log("🚀 ~ AppComponent ~ catchError ~ error:", error)
        return throwError(() => error);
      })
    );
  }

  public deleteTodo(uuid: string) {
    this.todosFacadeService.deleteTodo(uuid)
  }

  private getTodos() {
    this.todosFacadeService.getTodos().pipe(
      takeUntil(this.destroy$)
    ).subscribe()
  }

}
