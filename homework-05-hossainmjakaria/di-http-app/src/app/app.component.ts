import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { DataService } from './data.service';
import { Result, Root } from './model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
  <button (click)="handleShowHide()" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Show/Hide</button>
  <!-- <app-list *ngIf="this.show && results && results.length > 0" [list]="results"></app-list> -->
  <app-list *ngIf="(root$|async)?.results as data" [list]="data"></app-list>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  // results!: Result[];
  root$!: Observable<Root>;
  show: boolean = false;
  #service = inject(DataService);

  ngOnInit(): void {
    initFlowbite();
    this.root$ = this.#service.getData();
  }

  // handleShowHide = () => {
  //   this.show = !this.show;
  //   if (this.show) {
  //     this.#service.getData()
  //       .subscribe((res: Root) => {
  //         if (res)
  //           this.results = res.results;
  //       })
  //   }
  // }

  handleShowHide = () => {
    this.show = !this.show;
  }
}
