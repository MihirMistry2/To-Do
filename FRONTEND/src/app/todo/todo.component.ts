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

  saveTodo() {
    if (+this.id === -1) {
      this.todoDataService.createTodo(this.todo).subscribe((response) => {
        this.router.navigate(['/todos']);
      });
    } else {
      this.todoDataService
        .updateTodo(this.id, this.todo)
        .subscribe((response) => {
          this.router.navigate(['/todos']);
        });
    }
  }
}
