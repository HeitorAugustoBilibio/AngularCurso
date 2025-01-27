import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../categories/services/category.service';
import { createTaskForm } from '../../../constants/create-Task-Form';
import { Task } from '../../../model/task.model';
import { TaskService } from '../../../services/task.service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';



@Component({
  selector: 'app-include-task-form',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: `./include-task-form.component.html`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncludeTaskFormComponent {
  private readonly categoryService = inject(CategoryService)

  private readonly taskService = inject(TaskService)


  public readonly categories = this.categoryService.categories;

  public newTaskForm = createTaskForm(); 

  public destroy$ = inject(DestroyRef);

  selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;
    this.categoryService.selectedCategoryId.set(categoryId);
  }

  public onEnterToAddATask(): void {
    if (this.newTaskForm.invalid) return;

    const {title, categoryId} = this.newTaskForm.value

    const newTask: Partial<Task> = {
      title,
      categoryId,
      isCompleted: false
    };

    this.taskService.createTask(newTask)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe({
      next: task => this.taskService.InsertATaskInTheTasksList(task),
      error: (error) => { 
        throw new Error(error.message)
      },
      complete: () => alert('Tarefa criada com sucesso')
    });
  }
 }
