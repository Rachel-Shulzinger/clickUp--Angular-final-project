import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ProjectStore } from '../../state/project/project.store';
import { PrjectsService } from '../../services/projects/prjects-service';
import { TaskStatus, TaskPriority } from '../../models/task.model';

export interface CreateTaskData {
  projectId?: string;
}

@Component({
  selector: 'app-create-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './create-task-modal.html',
  styleUrl: './create-task-modal.css'
})
export class CreateTaskModal implements OnInit {
  private projectStore = inject(ProjectStore);
  private projectsService = inject(PrjectsService);
  
  taskTitle: string = '';
  taskDescription: string = '';
  selectedProjectId: string | undefined = undefined;
  selectedStatus: TaskStatus = TaskStatus.TODO;
  selectedPriority: TaskPriority = TaskPriority.NORMAL;
  selectedDueDate: Date | undefined = undefined;
  
  projects = this.projectStore.allProjects;

  // רשימת הסטטוסים והעדיפויות
  statuses = [
    { value: TaskStatus.TODO, label: 'To Do' },
    { value: TaskStatus.IN_PROGRESS, label: 'In Progress' },
    { value: TaskStatus.DONE, label: 'Done' }
  ];

  priorities = [
    { value: TaskPriority.LOW, label: 'Low' },
    { value: TaskPriority.NORMAL, label: 'Normal' },
    { value: TaskPriority.HIGH, label: 'High' }
  ];

  constructor(
    private dialogRef: MatDialogRef<CreateTaskModal>,
    @Inject(MAT_DIALOG_DATA) public data?: CreateTaskData
  ) {}

  ngOnInit() {
    // טעינת projects אם אין
    if (this.projects().length === 0) {
      this.projectsService.getProjects();
    }
    
    // אם נשלח projectId, נבחר אותו אוטומטית
    if (this.data?.projectId) {
      this.selectedProjectId = this.data.projectId;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.taskTitle.trim() && this.selectedProjectId) {
      const result = {
        projectId: Number(this.selectedProjectId), // המרה למספר
        title: this.taskTitle.trim(),
        description: this.taskDescription.trim() || undefined,
        status: this.selectedStatus,
        priority: this.selectedPriority,
        dueDate: this.selectedDueDate ? this.selectedDueDate.toISOString().split('T')[0] : undefined // פורמט תאריך
      };
      this.dialogRef.close(result);
    }
  }

  isValid(): boolean {
    return this.taskTitle.trim().length > 0 && !!this.selectedProjectId;
  }

  isProjectLocked(): boolean {
    return !!this.data?.projectId;
  }
}
