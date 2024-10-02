import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal([
    'Learn Angular',
    'Learn React',
    'Learn Vue',
    'Learn Angular',
    'Learn React',
    'Learn Vue',
  ]);

  changleHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;

    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => {
      tasks.splice(index, 1);
      return tasks;
    });
  }
}
