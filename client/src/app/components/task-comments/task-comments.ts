import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment/comment-service';
import { CommentStore } from '../../state/comment/comment.store';

export interface TaskCommentsData {
  taskId: string;
  taskTitle: string;
}

@Component({
  selector: 'app-task-comments',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './task-comments.html',
  styleUrl: './task-comments.css'
})
export class TaskCommentsModal implements OnInit {
  private commentService = inject(CommentService);
  private commentStore = inject(CommentStore);
  
  comments = this.commentStore.allComments;
  loading = this.commentStore.loading;
  
  newCommentText: string = '';

  constructor(
    private dialogRef: MatDialogRef<TaskCommentsModal>,
    @Inject(MAT_DIALOG_DATA) public data: TaskCommentsData
  ) {}

  async ngOnInit() {
    // טעינת תגובות קיימות
    await this.loadComments();
  }

  async loadComments() {
    try {
      await this.commentService.getTaskComments(this.data.taskId);
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  }

  async onAddComment() {
    if (this.newCommentText.trim()) {
      try {
        await this.commentService.addCommentToTask(this.data.taskId, this.newCommentText.trim());
        this.newCommentText = '';
        // רענון התגובות
        await this.loadComments();
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  isCommentValid(): boolean {
    return this.newCommentText.trim().length > 0;
  }
}
