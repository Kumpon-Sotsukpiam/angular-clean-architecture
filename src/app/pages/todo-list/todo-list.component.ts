import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ScannedActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { initFlowbite } from 'flowbite';

import { TodosFacadeService } from '@core/todo';
import { TodoActionTypes } from '@store/todo/todo.actions';
import { MockDbService } from '@mock/mock.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()
  public form: any;

  constructor(
    public readonly todosFacadeService: TodosFacadeService,
    private readonly mockDbService: MockDbService,
    private readonly actions$: ScannedActionsSubject
  ) {
    this.initForm();
    actions$.pipe(takeUntil(this.destroy$))
      .pipe(ofType(TodoActionTypes.createTodoFailure))
      .subscribe(action => {
        console.log("🚀 ~ AppComponent ~ constructor ~ action", action)
      })
  }

  private initForm() {
    this.form = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  ngOnInit(): void {
    console.log("🚀 ~ TodoListComponent ~ ngOnInit")
    initFlowbite();
    this.getTodos();
  }

  ngOnDestroy(): void {
    console.log("🚀 ~ TodoListComponent ~ ngOnDestroy")
    this.destroy$.next();
    this.destroy$.complete();
  }

  public submitForm() {
    console.log("🚀 ~ TodoListComponent ~ submitForm ~ this.form", this.form.value)
    const todo = this.mockDbService.createRandomTodo()
    todo.title = this.form.value.title
    this.todosFacadeService.createTodo(todo)
  }

  public createTodo() {
    const todo = this.mockDbService.createRandomTodo()
    this.todosFacadeService.createTodo(todo)
  }

  public deleteTodo(id: string) {
    // this.todosFacadeService.deleteTodo(uuid)
  }

  private getTodos() {
    this.todosFacadeService.getTodos()
  }

}
