import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodosDataModule } from '../lib'

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    TodosDataModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
