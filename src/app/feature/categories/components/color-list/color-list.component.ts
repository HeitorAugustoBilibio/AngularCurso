import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { CategoryService } from '../../services/category.service';
import { categoryBackgroundColors } from '../../constants/category-colors';

@Component({
  selector: 'app-color-list',
  standalone: true,
  imports: [MatDivider],
  templateUrl: `./color.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorListComponent { 

    private readonly categoryService = inject(CategoryService);

    public categories = this.categoryService.categories

    public categoryBackgroundColors = categoryBackgroundColors
}
