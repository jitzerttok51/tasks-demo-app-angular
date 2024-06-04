import { Component, input, output, signal } from '@angular/core';
import { DUMMY_USERS, User } from '../../models/User';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user = input.required<User>()
  select = output<User>()
  selected = input.required<boolean>()

  onSelectUser() {
    this.select.emit(this.user())
  }

}
