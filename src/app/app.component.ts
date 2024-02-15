import { Component, OnDestroy, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-tour-of-heroes';

  constructor() { }

  ngOnInit(): void {
    console.log("🚀 ~ AppComponent ~ ngOnInit")
    initFlowbite();
  }

  ngOnDestroy(): void {
    console.log("🚀 ~ AppComponent ~ ngOnDestroy")
  }

}
