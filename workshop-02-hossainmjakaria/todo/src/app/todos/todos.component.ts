import { Component, Input, inject } from '@angular/core';
import { Todo, TodoService } from './todo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-todos',
  template: `
  <button (click)="addTodo()">Add todo</button>
  <p *ngFor="let todo of todos" >
    <a [routerLink]="['', 'update', todo._id]">{{todo.title}}</a>
    <button (click)="deleteTodo(todo._id)">X</button>
  </p>
  <button (click)="navigateNext()" *ngIf="displayNext">next</button>
  `,
  styles: [
  ]
})
export class TodosComponent {
  #todoService = inject(TodoService);
  #router = inject(Router);
  todos: Todo[] = [];
  displayNext: boolean = false;
  @Input() public page: number = 1;

  ngOnChanges() {
    this.#todoService.get(this.page)
      .subscribe(({ data, next }) => {
        this.todos = data;
        this.displayNext = next;
      });
  }

  navigateNext() {
    //this is workaround code as page is not casting directly to number
    let tempPage = this.page ? parseInt(this.page?.toString()) : 1;
    this.#router.navigate([''], { queryParams: { page: tempPage + 1 } })
  }

  addTodo() {
    this.#router.navigate(['', 'add'])
  }

  deleteTodo(id: string) {
    this.#todoService.delete(id).subscribe(res => {
      this.todos = this.todos.filter(todo => todo._id !== id);
    });
  }
}
