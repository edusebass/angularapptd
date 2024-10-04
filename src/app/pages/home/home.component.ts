import { CommonModule, JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Learn Angular',
      completed: true,
    },
    {
      id: 2,
      title: 'Learn React',
      completed: false,
    },
    {
      id: 3,
      title: 'Learn Vue',
      completed: false,
    },
  ]);

  changleHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => {
      tasks.splice(index, 1);
      return tasks;
    });
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    });
  }
}
