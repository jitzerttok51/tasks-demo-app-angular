import { Component, input, output } from '@angular/core';
import { Task } from '../../models/Tasks';
import { CardComponent } from '../shared/card/card.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  task = input.required<Task>()
  complete = output<Task>()

  onClick() {
    console.log("1")
    this.complete.emit(this.task())
  }
}
