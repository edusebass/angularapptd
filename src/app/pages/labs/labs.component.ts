import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  tasks = signal([
    'Learn Angular',
    'Learn React',
    'Learn Vue',
    'Learn Angular',
    'Learn React',
    'Learn Vue',
  ]);
  // name = 'Eduardo';
  img =
    'https://bs-uploads.toptal.io/blackfish-uploads/components/seo/5911499/og_image/optimized/top-18-most-common-angularjs-developer-mistakes-41f9ad303a51db70e4a5204e101e7414.png';
  disabled = true;
  person = signal({
    name: 'Eduardo',
    age: 23,
    address: 'Calle 1 # 2-3',
  });

  name = signal('Eduardo');

  clickHandler() {
    alert('Hola');
  }

  changeHandler(event: Event) {
    console.log(event);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
    this.name.set(input.value);
    console.log(event);
  }

  changeAgeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((prevState) => {
      return {
        ...prevState,
        age: parseInt(newValue),
      };
    });
  }

  // updateTaskEditingMode(index: number) {
  //   this.tasks.update((prevState) => {
  //     return prevState.map((task: Task, position) => {
  //       if (position === index) {
  //         return {
  //           ...task,
  //           editing: true,
  //         };
  //       }
  //       return task;
  //     });
  //   });
  // }
}
