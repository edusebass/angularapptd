import { JsonPipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { Task } from './../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([]);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^\S*$/)],
  });

  injector = inject(Injector);

  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks() {
    effect(
      () => {
        const tasks = this.tasks();
        console.log('tasks', tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      },
      { injector: this.injector }
    );
  }

  changleHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value;
      this.addTask(value);
    }
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
    this.tasks.update((prevState) => {
      return prevState.map((task, i) => {
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

  editTask(index: number) {
    this.tasks.update((prevState) => {
      return prevState.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing: false,
        };
      });
    });
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((prevState) => {
      return prevState.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            title: input.value,
            editing: false,
          };
        }
        return task;
      });
    });
  }

  toggleComplete(index: number, event: Event) {
    event.stopPropagation(); // Previene que el evento se propague
    this.updateTask(index);
  }

  filter = signal('all');

  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  });

  changeFilter(filter: 'all' | 'completed' | 'pending') {
    this.filter.set(filter);
  }
}
