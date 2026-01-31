import { Component, inject } from '@angular/core';
import { TaskStore } from '../../state/task/task.store';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/tasks/task-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskModal } from '../create-task-modal/create-task-modal';
import { EditTaskModal } from '../edit-task-modal/edit-task-modal';
import { TaskCommentsModal } from '../task-comments/task-comments';
import { ConfirmPopup } from '../confirm-popup/confirm-popup';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ProjectStore } from '../../state/project/project.store';
import { Task as TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './task.html',
  styleUrl: './task.css',
})

export class Task {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private taskStore = inject(TaskStore);
  private projectStore = inject(ProjectStore);
  private dialog = inject(MatDialog);

  tasks = this.taskStore.allTasks;
  loading = this.taskStore.loading;
  
  currentProjectId: string | null = null;
  currentProjectName: string = '';

  constructor() {
    // קריאת projectId מה-route
    this.route.params.subscribe(params => {
      this.currentProjectId = params['projectId'] || null;
      
      if (this.currentProjectId) {
        // אם יש projectId - מציג משימות של פרויקט ספציפי
        const project = this.projectStore.allProjects().find(p => p.id?.toString() === this.currentProjectId);
        this.currentProjectName = project?.name || 'Project';
        this.loadProjectTasks(this.currentProjectId);
      } else {
        // אם אין projectId - מציג את כל המשימות
        this.loadAllTasks();
      }
    });
  }

  async loadAllTasks() {
    await this.taskService.getTasks();
  }

  async loadProjectTasks(projectId: string) {
    await this.taskService.getTasks(projectId);
  }

  getPageTitle(): string {
    return this.currentProjectId ? `${this.currentProjectName} - Tasks` : 'All Tasks';
  }

  onCreateTask(){
    const dialogRef = this.dialog.open(CreateTaskModal, {
      width: '500px',
      data: this.currentProjectId ? { projectId: this.currentProjectId } : undefined
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        try {
          const newTask = await this.taskService.createTask(result);
          
          // אין צורך לטעון מחדש - המשימה כבר התווספה ל-store
        } catch (error) {
          console.error('Failed to create task:', error);
        }
      }
    });
  }

  onDeleteTask(taskId: string) {
    const dialogRef = this.dialog.open(ConfirmPopup, {
      width: '350px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this task?',
        confirmText: 'Delete',
        color: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.taskService.deleteTask(taskId);
          
          // רענון המשימות לאחר מחיקה
          if (this.currentProjectId) {
            await this.loadProjectTasks(this.currentProjectId);
          } else {
            await this.loadAllTasks();
          }
        } catch (error) {
          console.error('Failed to delete task:', error);
        }
      }
    });
  }

  onUpdateTask(task: TaskModel) {
    const dialogRef = this.dialog.open(EditTaskModal, {
      width: '500px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && task.id) {
        try {
          await this.taskService.updateTask(task.id, result);
          
          // לא צריך לרענן - ה-store מתעדכן אוטומטית
        } catch (error) {
          console.error('Failed to update task:', error);
        }
      }
    });
  }

  onViewComments(task: TaskModel) {
    if (!task.id) {
      console.error('Task has no ID');
      return;
    }

    this.dialog.open(TaskCommentsModal, {
      width: '600px',
      maxHeight: '80vh',
      data: {
        taskId: task.id,
        taskTitle: task.title
      }
    });
  }

}
