import { CommonModule } from '@angular/common';
import { Component, ViewChild, computed, effect, input, output, signal } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task, dummyTasks } from '../../models/Tasks';
import { User } from '../../models/User';
import { AddTaskDialog } from '../add-task-dialog/add-task-dialog.component';
import { TaskCreate } from '../../models/TaskCreate';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskComponent, AddTaskDialog],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  user = input.required<User>()
  tasks = input.required<Task[]>()

  complete = output<Task>();
  create = output<TaskCreate>();

  constructor() {
    
  }

  createTask(newTask: TaskCreate) {
    this.create.emit(newTask)
  }

  completeTask(forRemove: Task) {
    this.complete.emit(forRemove)
  }
}
