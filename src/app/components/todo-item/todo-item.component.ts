import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo:Todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  isHovered:boolean;
  isEditting = false;


  constructor() { }

  ngOnInit(): void {}

  submitEdit(event: KeyboardEvent){
    const {keyCode} = event;
    event.preventDefault(); //Prevent From to submit by Default
    if (keyCode === 13) {
      this.editTodo.emit(this.todo);
      this.isEditting = false;
    }
  }

  changeTodoStatus() {
    this.changeStatus.emit({...this.todo, isCompleted: !this.todo.isCompleted});
  }

  removeTodo() {
    this.deleteTodo.emit(this.todo)
  }

}
