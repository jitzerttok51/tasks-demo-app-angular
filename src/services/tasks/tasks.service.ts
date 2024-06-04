import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { DUMMY_USERS, User } from '../../models/User';
import { Task, dummyTasks } from '../../models/Tasks';
import { TaskCreate } from '../../models/TaskCreate';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private $users = signal(DUMMY_USERS);
  private $selectedUser = signal<User | undefined>(undefined)

  private $tasks: WritableSignal<Map<User, Task[]>>

  private $selectedUserTasks = computed<Task[]>(() => {
    let user = this.selectedUser();
    if (!user) {
      return [];
    }
    return this.$tasks().get(user) as Task[];
  });

  nextId = 10;

  constructor() {
    let map = new Map<User, Task[]>();
    DUMMY_USERS.forEach((user) =>
      map.set(
        user,
        dummyTasks.filter((task) => task.userId === user.id)
      )
    );
    this.$tasks = signal(map);
  }

  get users(): Signal<User[]> {
    return this.$users;
  }

  get selectedUser(): Signal<User | undefined> {
    return this.$selectedUser;
  }

  set selectedUser(user: User) {
    this.$selectedUser.set(user);
  }

  get selectedUserTasks(): Signal<Task[]> {
    return this.$selectedUserTasks;
  }

  onSelectUser(user: User) {
    this.$selectedUser.set(user)
  }

  onCompleteTask(completedTask: Task) {
    let selectedUser = this.selectedUser();
    if (!!selectedUser) {
      this.$tasks.update((map) => {
        let newMap = new Map<User, Task[]>();
        map.forEach((tasks, user) => {
          newMap.set(user, tasks);
          if (user.id === selectedUser.id) {
            newMap.set(
              user,
              tasks.filter((task) => task.id !== completedTask.id)
            );
          }
        });
        return newMap;
      });
    }
  }

  onCreateTask(newTask: TaskCreate) {
    let selectedUser = this.selectedUser();
    if (!!selectedUser) {
      let task: Task = {
        userId: selectedUser.id,
        id: 't' + this.nextId,
        title: newTask.title,
        summary: newTask.summary,
        dueDate: newTask.dueDate.toString(),
      };
      this.nextId++;

      this.$tasks.update((map) => {
        let newMap = new Map<User, Task[]>();
        map.forEach((tasks, user) => {
          newMap.set(user, tasks);
          if (user.id === selectedUser.id) {
            tasks.push(task);
            newMap.set(user, tasks);
          }
        });
        return newMap;
      });
    }
  }
}
