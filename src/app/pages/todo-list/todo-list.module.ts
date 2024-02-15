import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { UIModule } from 'src/app/components/ui/ui.module';
import { TodoListComponent } from './todo-list.component';

@NgModule({
  declarations: [TodoListComponent],
  imports: [
    CommonModule,
    UIModule,
    TodoListRoutingModule,
  ]
})
export class TodoListModule { }
