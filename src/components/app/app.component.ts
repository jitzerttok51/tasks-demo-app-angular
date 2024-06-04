import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { UserComponent } from '../user/user.component';
import { DUMMY_USERS, User } from '../../models/User';
import { TasksComponent } from '../tasks/tasks.component';
import { Task, dummyTasks } from '../../models/Tasks';
import { TaskCreate } from '../../models/TaskCreate';
import { TaskService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-demo';

  tasksService = inject(TaskService)

  users = this.tasksService.users
  selectedUser = this.tasksService.selectedUser
  selectedUserTasks = this.tasksService.selectedUserTasks

  onSelectUser(user: User) {
    this.tasksService.onSelectUser(user)
  }

  onCompleteTask(completedTask: Task) {
    this.tasksService.onCompleteTask(completedTask)
  }

  onCreateTask(newTask: TaskCreate) {
    this.tasksService.onCreateTask(newTask)
  }
}
