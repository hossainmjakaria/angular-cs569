import { Component, Input, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo, TodoGetResponse, TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  template: `
  <form [formGroup]="todoForm" (ngSubmit)="go()">
    <input type="text" formControlName="title" placeholder="todo title">
    <input type="text" formControlName="description" placeholder="todo description">
    <input type="checkbox" formControlName="completed" id="completed">
    <label for="completed">completed?</label>
    <button type="submit">Add</button>
  </form>
  `,
  styles: [
  ]
})
export class TodoComponent {
  @Input() id: string = '';
  #todoService = inject(TodoService);
  #router = inject(Router);

  todoForm = inject(FormBuilder).nonNullable.group({
    title: '',
    description: '',
    completed: false
  });

  ngOnChanges() {
    if (this.id) {
      this.#todoService.getById(this.id)
        .subscribe((res: TodoGetResponse) => {
          this.todoForm.patchValue(res.data);
        });
    }
  }

  go() {
    if (this.id) {
      let todo: Todo = {
        _id: this.id,
        completed: this.todoForm.value.completed || false,
        description: this.todoForm.value.description || '',
        title: this.todoForm.value.title || ''
      };
      this.#todoService.update(todo)
        .subscribe(res => {
          this.#router.navigate(['']);
        });
    }
    else {
      this.#todoService.addTodo(this.todoForm.value as Todo)
        .subscribe(res => {
          this.#router.navigate(['']);
        });
    }
  }
}
