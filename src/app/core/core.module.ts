import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TodosDataModule } from './todo'


@NgModule({
    imports: [
        CommonModule,
        TodosDataModule
    ],
    providers: [],
})
export class CoreDataModule { }