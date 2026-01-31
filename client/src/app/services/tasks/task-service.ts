import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TaskStore } from '../../state/task/task.store';
import { firstValueFrom } from 'rxjs';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';

interface TaskDto {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  project_id: string;
  assigned_to?: string;
  due_date?: string;
  created_by: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private readonly httpClient = inject(HttpClient);
  private readonly taskStore = inject(TaskStore);
  private readonly router = inject(Router);

  async getTasks(projectId?: string): Promise<void> {
    this.taskStore.setLoading(true);
    try {
      const options = projectId 
        ? { params: { projectId } } 
        : {};
      
      const tasks = await firstValueFrom(
        this.httpClient.get<TaskDto[]>(`/tasks`, options)
      );
      
      // Convert snake_case to camelCase
      const mappedTasks = tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        projectId: task.project_id,
        assignedTo: task.assigned_to,
        dueDate: task.due_date ? new Date(task.due_date) : undefined,
        createdBy: task.created_by,
        createdAt: task.created_at ? new Date(task.created_at) : undefined,
        updatedAt: task.updated_at ? new Date(task.updated_at) : undefined
      }));
      
      this.taskStore.setTasksSuccess(mappedTasks);
    } catch (error) {
      const err = error as HttpErrorResponse;
      const errorMessage = (err.error as any)?.message || 'Failed to load tasks';
      this.taskStore.setTasksFailure(errorMessage);
    }
  }

  async createTask(taskData: Partial<Task>): Promise<Task> {
    this.taskStore.setLoading(true);
    try {
      const newTask = await firstValueFrom(
        this.httpClient.post<TaskDto>(`/tasks`, taskData)
      );
      
      // Convert snake_case to camelCase
      const mappedTask = {
        id: newTask.id,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        priority: newTask.priority,
        projectId: newTask.project_id,
        assignedTo: newTask.assigned_to,
        dueDate: newTask.due_date ? new Date(newTask.due_date) : undefined,
        createdBy: newTask.created_by,
        createdAt: newTask.created_at ? new Date(newTask.created_at) : undefined,
        updatedAt: newTask.updated_at ? new Date(newTask.updated_at) : undefined
      };
      
      // הוספת המשימה החדשה ל-store
      this.taskStore.addTask(mappedTask);
      this.taskStore.setLoading(false);
      
      return mappedTask;
    } catch (error) {
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.error || errorBody?.message || 'Failed to create task';
      this.taskStore.setTasksFailure(errorMessage);
      throw error;
    }
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    this.taskStore.setLoading(true);
    try {
      const updatedTask = await firstValueFrom(
        this.httpClient.patch<TaskDto>(`/tasks/${taskId}`, updates)
      );
      
      // Convert snake_case to camelCase
      const mappedTask = {
        id: updatedTask.id,
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        priority: updatedTask.priority,
        projectId: updatedTask.project_id,
        assignedTo: updatedTask.assigned_to,
        dueDate: updatedTask.due_date ? new Date(updatedTask.due_date) : undefined,
        createdBy: updatedTask.created_by,
        createdAt: updatedTask.created_at ? new Date(updatedTask.created_at) : undefined,
        updatedAt: updatedTask.updated_at ? new Date(updatedTask.updated_at) : undefined
      };
      
      // עדכון המשימה ב-store
      this.taskStore.updateTask(taskId, mappedTask);
      this.taskStore.setLoading(false);
      
      return mappedTask;
    } catch (error) {
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.error || errorBody?.message || 'Failed to update task';
      this.taskStore.setTasksFailure(errorMessage);
      throw error;
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    this.taskStore.setLoading(true);
    try {
      await firstValueFrom(
        this.httpClient.delete<void>(`/tasks/${taskId}`)
      );
      
      // הסרת המשימה מה-store
      this.taskStore.removeTask(taskId);
      this.taskStore.setLoading(false);
    } catch (error) {  
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.message || 'Failed to delete task';
      this.taskStore.setTasksFailure(errorMessage);
      throw error;
    }
  }

}
