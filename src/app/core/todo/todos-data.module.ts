import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'

import { LocalTodosAdapterService } from './adapters/local-todos-adapter.service'
import { ApiTodosAdapterService } from './adapters/api-todos-adapter.service'
import { TodosAdapterService } from './services/todos-adapter.service'
import { TodosFacadeService } from './services/todos-facade.service'
import { todoReducer } from './store/todos.reducer'
import { TodoEffects } from './store/todo.effects'
import { TodosMockDbService } from './mock/todos.mock'

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(TodosMockDbService, { delay: 300 }),
        StoreModule.forFeature('todos', todoReducer),
        EffectsModule.forFeature([TodoEffects]),
    ],
    providers: [
        {
            provide: TodosAdapterService,
            useClass: ApiTodosAdapterService,
        },
        TodosFacadeService,
        TodosMockDbService
    ],
})
export class TodosDataModule { }