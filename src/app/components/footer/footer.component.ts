import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo.service';
import { Filter, FilteringButton } from '../../models/filtering.model'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  filterButtons: FilteringButton[] = [
    { type: Filter.All, label: 'All', isActive: true },
    { type: Filter.Active, label: 'Active', isActive: false },
    { type: Filter.Completed, label: 'Completed', isActive: false }
  ];

  length = 0;
  hasComplete$: Observable<boolean> = new Observable<boolean>();
  destroy$: Subject<null> = new Subject<null>();

  constructor( private todoService: TodoService ) { }

  ngOnInit(): void {
    this.hasComplete$ = this.todoService.todo$.pipe(
      map(todos => todos.some(t => t.isCompleted)),
      takeUntil(this.destroy$)
    );

    this.todoService.length$.pipe(takeUntil(this.destroy$)).subscribe(length => {
      this.length = length;
    })
  }

  filer(type: Filter) {
    this.setAcctiveFilterBtn(type);
    this.todoService.filterTodos(type)
  }

  private setAcctiveFilterBtn(type: Filter) {
    this.filterButtons.forEach(btn => {
      btn.isActive = btn.type === type
    })
  }

  clearCompleted() {
    this.todoService.clearCompleted();
    console.log('asdasd')
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete()
  }

}
