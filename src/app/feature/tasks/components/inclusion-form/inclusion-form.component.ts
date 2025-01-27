import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IncludeTaskFormComponent } from './include-task-form/include-task-form.component';
import { CategoryService } from '../../../categories/services/category.service';
import { categoryIdBackgroundColors } from '../../../categories/constants/category-colors';

@Component({
  selector: 'app-inclusion-form',
  standalone: true,
  imports: [IncludeTaskFormComponent],
  templateUrl: `./inclusion-form.component.html`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InclusionFormComponent { 
    private readonly categoryService = inject(CategoryService)
  
    public readonly selectedCategoryId = this.categoryService.selectedCategoryId;

    public colorVariantes = categoryIdBackgroundColors;
}
