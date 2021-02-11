import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/todo-data.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public is_done: number,
    public created_at: Date
  ) {}
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  searchText;
  todos: Todo[];
  message: string;
  allTasks: boolean = true;
  inProgress: boolean = false;
  onComplete: boolean = false;
  isEmty: boolean = false;

  constructor(
    private router: Router,
    private todoDataService: TodoDataService
  ) {}

  ngOnInit(): void {
    if (this.router.url === '/todos/inProgress') {
      this.inProgress = true;
      this.allTasks = false;
    } else if (this.router.url === '/todos/completed') {
      this.onComplete = true;
      this.allTasks = false;
    } else {
      this.allTasks = true;
    }

    this.onFetchTodos();
  }

  onFetchTodos() {
    this.todoDataService.getAllTodos().subscribe(
      (response) => {
        this.isEmty = false;
        this.todos = response['data'].reverse();
      },
      (error) => {
        if (error['error'].data === 'No record') {
          this.isEmty = true;
        }
        console.log(error);
      }
    );
  }

  onEditTodo(id: number) {
    this.router.navigate(['/todos', id]);
  }

  onDeleteTodo(id: number) {
    this.todoDataService.deleteTodo(id).subscribe((response) => {
      this.message = 'Succesfuly Todo Delete';
      this.onFetchTodos();
    });
  }
}
