import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-main-list',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainListComponent { 
  private readonly categoryService = inject(CategoryService);

  public categories = this.categoryService.categories

}
