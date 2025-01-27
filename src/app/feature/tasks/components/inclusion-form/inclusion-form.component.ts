import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IncludeTaskFormComponent } from './include-task-form/include-task-form.component';
import { CategoryService } from '../../../categories/services/category.service';
import { categoryIdBackgroundColors } from '../../../categories/constants/category-colors';
import { TaskService } from '../../services/task.service.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-inclusion-form',
  standalone: true,
  imports: [IncludeTaskFormComponent, NgClass],
  templateUrl: `./inclusion-form.component.html`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InclusionFormComponent { 
    private readonly categoryService = inject(CategoryService)

    public readonly taskService = inject(TaskService)
  
    public readonly selectedCategoryId = this.categoryService.selectedCategoryId;

    public colorVariantes = categoryIdBackgroundColors;
}
