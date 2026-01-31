import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommentStore } from '../../state/comment/comment.store';
import { firstValueFrom } from 'rxjs';
import { CommentModel } from '../../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  private readonly httpClient = inject(HttpClient);
  private readonly commentStore = inject(CommentStore);
  private readonly router = inject(Router);

  async getTaskComments(taskId: string): Promise<void> {
    this.commentStore.setLoading(true);
    try {
      const comments = await firstValueFrom(
        this.httpClient.get<CommentModel[]>(`/comments`, { params: { taskId } })
      );
      this.commentStore.setCommentsSuccess(comments);
    } catch (error) {
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.message || 'Failed to load comments';
      this.commentStore.setCommentsFailure(errorMessage);
      throw error;
    }
  }

  async addCommentToTask(taskId: string, body: string): Promise<void> {
    this.commentStore.setLoading(true);
    try {
      const newComment = await firstValueFrom(
        this.httpClient.post<CommentModel>(`/comments`, { taskId, body })
      );
      
      // הוספת התגובה החדשה ל-store
      this.commentStore.addComment(newComment);
      this.commentStore.setLoading(false);
    } catch (error) {
      const err = error as HttpErrorResponse;
      const errorBody = err.error as any;
      const errorMessage = errorBody?.message || 'Failed to add comment';
      this.commentStore.setCommentsFailure(errorMessage);
      throw error;
    }
  }
  
}
