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
import { Task, TaskStatus, TaskPriority } from '../../models/task.model';

export interface EditTaskData {
  task: Task;
}

@Component({
  selector: 'app-edit-task-dialog',
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
  templateUrl: './edit-task-modal.html',
  styleUrl: './edit-task-modal.css'
})
export class EditTaskModal implements OnInit {
  
  taskTitle: string = '';
  taskDescription: string = '';
  selectedStatus: TaskStatus = TaskStatus.TODO;
  selectedPriority: TaskPriority = TaskPriority.NORMAL;
  selectedDueDate: Date | undefined = undefined;
  
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
    private dialogRef: MatDialogRef<EditTaskModal>,
    @Inject(MAT_DIALOG_DATA) public data: EditTaskData
  ) {}

  ngOnInit() {
    // אכלוס השדות עם הערכים הקיימים של המשימה
    if (this.data.task) {
      this.taskTitle = this.data.task.title || '';
      this.taskDescription = this.data.task.description || '';
      this.selectedStatus = this.data.task.status || TaskStatus.TODO;
      this.selectedPriority = this.data.task.priority || TaskPriority.NORMAL;
      
      // המרת תאריך אם קיים
      if (this.data.task.dueDate) {
        this.selectedDueDate = new Date(this.data.task.dueDate);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.taskTitle.trim()) {
      // מחזירים רק את השדות שהשתנו
      const result = {
        title: this.taskTitle.trim(),
        description: this.taskDescription.trim() || undefined,
        status: this.selectedStatus,
        priority: this.selectedPriority,
        dueDate: this.selectedDueDate ? this.selectedDueDate.toISOString().split('T')[0] : undefined
      };
      this.dialogRef.close(result);
    }
  }

  isValid(): boolean {
    return this.taskTitle.trim().length > 0;
  }
}
