import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ScannedActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import { TodosFacadeService } from '@core';
import { TodoActionTypes } from '@core/todo/store/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()

  title = 'angular-tour-of-heroes';

  constructor(
    public readonly todosFacadeService: TodosFacadeService,
    private readonly actions$: ScannedActionsSubject
  ) {
    actions$.pipe(takeUntil(this.destroy$))
      .pipe(ofType(TodoActionTypes.createTodoFailure))
      .subscribe(action => {
        console.log("🚀 ~ AppComponent ~ constructor ~ action", action)
      })
  }

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
    })
  }

  public deleteTodo(uuid: string) {
    // this.todosFacadeService.deleteTodo(uuid)
  }

  private getTodos() {
    this.todosFacadeService.getTodos()
    // .pipe(
    //   takeUntil(this.destroy$)
    // ).subscribe()
  }

}
