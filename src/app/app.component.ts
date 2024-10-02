import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todoappangular';
  palabra = 'esta viene directaemte del app.componet .ts';
  tasks = signal([
    'Learn Angular',
    'Learn React',
    'Learn Vue',
    'Learn Angular',
    'Learn React',
    'Learn Vue',
  ]);
}
