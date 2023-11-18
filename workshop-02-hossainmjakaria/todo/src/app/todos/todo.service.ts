import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment'

export type Todo = { _id: string, title: string, description: string, completed: boolean }
export type TodoListResponse = { success: boolean, data: Todo[], next: boolean }
export type TodoAddResponse = { success: boolean, data: Todo }
export type TodoGetResponse = { success: boolean, data: Todo }
export type TodoDeleteResponse = { success: boolean, data: { deletedCount: number } }
export type TodoUpdateResponse = { success: boolean, data: { modifiedCount: number } }

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  #http = inject(HttpClient)

  get(page: number = 1) {
    return this.#http.get<TodoListResponse>(`${environment.SERVER_URL}/todos?page=${page}`);
  }

  addTodo(todo: Todo) {
    return this.#http.post<TodoAddResponse>(`${environment.SERVER_URL}/todos`, todo);
  }

  getById(id: string) {
    return this.#http.get<TodoGetResponse>(`${environment.SERVER_URL}/todos/${id}`);
  }

  delete(id: string) {
    return this.#http.delete<TodoDeleteResponse>(`${environment.SERVER_URL}/todos/${id}`);
  }

  update(todo: Todo) {
    return this.#http.put<TodoUpdateResponse>(`${environment.SERVER_URL}/todos/${todo._id}`, todo);
  }
}