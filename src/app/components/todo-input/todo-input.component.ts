import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {

  todoContent = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.todoContent.trim() === '') { // trim(): Remove whitespace from both sides of a string
      return false;
    }
    this.todoService.addTodo(this.todoContent);
    this.todoContent = '';
  }

}
