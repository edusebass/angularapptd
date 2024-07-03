import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  tasks = [
    'Learn Angular',
    'Learn React',
    'Learn Vue',
    'Learn Angular',
    'Learn React',
    'Learn Vue'
  ]
  name = "Eduardo";
  img = 'https://bs-uploads.toptal.io/blackfish-uploads/components/seo/5911499/og_image/optimized/top-18-most-common-angularjs-developer-mistakes-41f9ad303a51db70e4a5204e101e7414.png'
  disabled = true
}
