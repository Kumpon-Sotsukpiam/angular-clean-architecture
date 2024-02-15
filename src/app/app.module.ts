import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { TodosDataModule } from './lib';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {
      metaReducers: []
    }),
    EffectsModule.forRoot([]),
    TodosDataModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
