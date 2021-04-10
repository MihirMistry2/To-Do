import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from '../service/todo-data.service';
import { Todo } from '../todos/todos.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  id: number;
  userName: string;
  todo: Todo;
  isSuccess: boolean = false;
  successMessage: string = '';
  isError: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoDataService: TodoDataService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', 0, new Date());

    if (this.id != -1) {
      this.todoDataService.getTodoById(this.id).subscribe((response) => {
        this.todo = response['data'][0];
      });
    }
  }

  reDirectToPageTodos(response) {
    window.scrollTo(0, 0);
    this.isSuccess = true;
    this.successMessage = response['message'];
    setTimeout(() => {
      this.router.navigate(['/todos']);
    }, 1000);
  }

  saveTodo() {
    if (this.todo.description != '') {
      if (+this.id === -1) {
        this.todoDataService.createTodo(this.todo).subscribe((response) => {
          this.reDirectToPageTodos(response);
        });
      } else {
        this.todoDataService
          .updateTodo(this.id, this.todo)
          .subscribe((response) => {
            this.reDirectToPageTodos(response);
          });
      }
    } else {
      window.scrollTo(0, 0);
      this.isError = true;
      this.errorMessage = 'Description can not be emplty';
    }
  }
}
