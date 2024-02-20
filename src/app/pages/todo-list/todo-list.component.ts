import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, filter, takeUntil } from 'rxjs';
import { ScannedActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { initFlowbite } from 'flowbite';

import { TodosFacadeService } from '@core/todo';
import { CreateTodoSuccess, TodoActionTypes } from '@store/todo/todo.actions';
import { MockDbService } from '@mock/mock.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()
  public form: FormGroup;
  @ViewChild('data') private dataContainer: ElementRef;

  constructor(
    public readonly todosFacadeService: TodosFacadeService,
    private readonly mockDbService: MockDbService,
    private readonly actions$: ScannedActionsSubject
  ) {
    // this.autoScroll();
    this.initForm();
    actions$.pipe(takeUntil(this.destroy$))
      .pipe(filter(action => (action.type === TodoActionTypes.createTodoSuccess)))
      .subscribe((_) => {
        this.resetForm();
        setTimeout(() => {
          this.scrollToBottom();
        }, 50);
      })
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

  private initForm() {
    this.form = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)]
      })
    });
  }

  private resetForm(): void {
    this.form.reset();
  }

  public submitForm() {
    console.log("🚀 ~ TodoListComponent ~ submitForm ~ this.form", this.form.value)
    if (this.form.valid) {
      const todo = this.mockDbService.createRandomTodo()
      todo.title = this.form.value.title
      this.todosFacadeService.createTodo(todo)
    }
  }

  public disabledSubmitForm() {
    return this.form.invalid;
  }

  public createTodo() {
    const todo = this.mockDbService.createRandomTodo()
    this.todosFacadeService.createTodo(todo)
  }

  public deleteTodo(id: string) {
  }

  private getTodos() {
    this.todosFacadeService.getTodos()
  }

  // autoScroll() {
  //   setInterval(() => {
  //     this.scrollToBottom();
  //   }, 5000);
  // }

  scrollToBottom(): void {
    try {
      this.dataContainer.nativeElement.scrollTop = this.dataContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
