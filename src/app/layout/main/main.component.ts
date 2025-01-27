import { Component } from '@angular/core';
import { CategoryComponent } from '../../feature/categories/view/category/category.component';
import {MatDividerModule} from '@angular/material/divider'
import { TasksComponent } from '../../feature/tasks/view/tasks/tasks.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CategoryComponent, MatDividerModule, TasksComponent],
  templateUrl: './main.component.html',
  styles: ''
})
export class MainComponent {

}
