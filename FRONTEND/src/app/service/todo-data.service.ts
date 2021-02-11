import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  constructor(private http: HttpClient) {}

  getAllTodos() {
    return this.http.get<any>('http://localhost:8080/api/todos/');
  }

  getTodoById(id: number) {
    return this.http.get<any>(`http://localhost:8080/api/todos/${id}`);
  }

  updateTodo(id, todo) {
    let newTodo = {
      description: todo.description,
      done: todo.is_done,
    };

    return this.http.put(`http://localhost:8080/api/todos/${id}`, newTodo);
  }

  deleteTodo(id: number) {
    return this.http.delete(`http://localhost:8080/api/todos/${id}`);
  }

  createTodo(todo) {
    let newTodo = {
      description: todo.description,
      done: todo.is_done,
    };

    return this.http.post(`http://localhost:8080/api/todos/`, newTodo);
  }
}
