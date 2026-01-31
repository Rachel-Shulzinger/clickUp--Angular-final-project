import { computed } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { CommentModel } from "../../models/comment.model";


export interface CommentState {
    comments: CommentModel[];
    isLoading: boolean;
    error: string | null;
}

export const initialCommentState: CommentState = {
    comments: [],
    isLoading: false,
    error: null
};

export const CommentStore = signalStore(
    { providedIn: 'root' },
    withState(initialCommentState),
    withComputed(({ comments, isLoading, error }) => ({
        allComments: computed(() => comments()),
        loading: computed(() => isLoading()),
        commentError: computed(() => error()),
        hasComments: computed(() => comments().length > 0)
    })),

    withMethods((store) => ({
        setLoading(isLoading: boolean): void {
            patchState(store, { isLoading, error: null });
        },
        setCommentsSuccess(comments: CommentModel[]): void {
            patchState(store, { comments, isLoading: false, error: null });
        },
        setCommentsFailure(error: string): void {
            patchState(store, { isLoading: false, error, comments: [] });
        },
        addComment(comment: CommentModel): void {
            patchState(store, { comments: [...store.comments(), comment] });
        }
   }))

);