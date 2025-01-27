import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../categories/services/category.service';
import { Task } from '../../../model/task.model';
import { TaskService } from '../../../services/task.service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, finalize } from 'rxjs';
import { createTaskForm } from '../../../constants/create-task-form';
import { NgClass } from '@angular/common';
import { SnackBarService } from '../../../../../shared/services/snack-bar.service';



@Component({
  selector: 'app-include-task-form',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: `./include-task-form.component.html`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncludeTaskFormComponent {
  private readonly categoryService = inject(CategoryService)

  private readonly taskService = inject(TaskService)

  public readonly categories = this.categoryService.categories;

  public readonly newTaskForm = createTaskForm(); 

  private readonly destroy$ = inject(DestroyRef);

  private readonly snackBarService = inject(SnackBarService);

  public isIncludeTaskFormDisabled = computed(() => {
    if(this.taskService.isLoadingTask()){
      this.newTaskForm.disable();

      return this.taskService.isLoadingTask()
    }

    this.newTaskForm.enable()

    return this.taskService.isLoadingTask();

  })

  selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;
    this.categoryService.selectedCategoryId.set(categoryId);
  }

  public onEnterToAddATask(): void {
    if (this.newTaskForm.invalid) return;

    this.taskService.isLoadingTask.set(true);

    const {title, categoryId} = this.newTaskForm.value

    const newTask: Partial<Task> = {
      title,
      categoryId,
      isCompleted: false
    };

    this.taskService.createTask(newTask)
      .pipe(delay(4000), finalize(() => this.taskService.isLoadingTask.set(false)), takeUntilDestroyed(this.destroy$))
      .subscribe({
      next: task => this.taskService.InsertATaskInTheTasksList(task),
      error: (error) => { 
        this.snackBarService.showSnackBar(error.message, 4000, 'end', 'top')
      },
      complete: () => this.snackBarService.showSnackBar("Tarefa incluida", 4000, 'end', 'top')

    });
  }
 }
