import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'

import { TodoEffects } from '@store/todo/todo.effects'
import { todoReducer } from '@store/todo/todos.reducer'

import { ApiTodosAdapterService } from './adapters/api-todos-adapter.service'
import { TodosAdapterService } from './services/todos-adapter.service'
import { TodosFacadeService } from './services/todos-facade.service'

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('todos', todoReducer),
        EffectsModule.forFeature([TodoEffects]),
    ],
    providers: [
        {
            provide: TodosAdapterService,
            useClass: ApiTodosAdapterService,
        },
        TodosFacadeService,
    ],
})
export class TodosDataModule { }