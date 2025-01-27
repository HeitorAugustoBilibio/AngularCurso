import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../model/task.model';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly _htppClient = inject(HttpClient);

  public tasks = signal<Task[]>([])
  public numberOfTasks = computed(() => this.tasks().length);
  public readonly apiUrl = environment.apiUrl;

  public getTasks(): void {
    this._htppClient.get<Task[]>(`${this.apiUrl}/tasks`).subscribe((tasks) => {
    const sortedTasks = this.getSortedTask(tasks);
    this.tasks.set(sortedTasks); 
  });
  }

  // public getTasks(): Observable<Task[]> {
  //   return this._htppClient.get<Task[]>(`${this.apiUrl}/tasks`).pipe(
  //     tap(tasks => {
  //       const SortedTask = this.getSortedTask(tasks)
  //       this.tasks.set(SortedTask)
  //     })
  //   )
  // }

  public createTask(task: Partial<Task>): Observable<Task> {
    return this._htppClient.post<Task>(`${this.apiUrl}/tasks`, task)
  }

  public InsertATaskInTheTasksList(newTasks: Task): void{
    const updateTasks = [...this.tasks(), newTasks];
    const SortedTask = this.getSortedTask(updateTasks)
    this.tasks.set(SortedTask);
  }

  public updateTask(updateTask: Task): Observable<Task>{
    return this._htppClient.put<Task>(
      `${this.apiUrl}/tasks/${updateTask.id}`, 
      updateTask
    );
  }

  public updateIsCompletedStatus(taskId: string, isCompleted: boolean): Observable<Task>{
    return this._htppClient.patch<Task>(
      `${this.apiUrl}/tasks/${taskId}`, {
        isCompleted,
    })
  }

  public deleteTask(TaskId: string): Observable<Task> {
    return this._htppClient.delete<Task>(`${this.apiUrl}/tasks/${TaskId}`);
  }

  public deleteATaskInTheTasksList(TaskId: string): void {
    this.tasks.update(tasks => tasks.filter(task => task.id != TaskId));
  }

  public UpdateATaskInTheTasksList(updatedTasks: Task): void {
    this.tasks.update(tasks =>{
      const allTasksWithUpdatedTaskRemoved = tasks.filter(
        tasks => tasks.id != updatedTasks.id
      );

      const updatedTaskList = [...allTasksWithUpdatedTaskRemoved, updatedTasks]

      return this.getSortedTask(updatedTaskList)
    });
  }


  public getSortedTask(tasks: Task[]): Task[]{
    return tasks.sort((a, b) => a.title.localeCompare(b.title));
  }

}
