
export interface CommentModel {
    id?: number;
    task_id?: number;
    user_id?: number;
    body?: string;
    created_at?: string;
    author_name?: string;
}

export class Comment implements CommentModel {
    constructor(
        public id?: number,
        public task_id?: number,
        public user_id?: number,
        public body: string = '',
        public created_at?: string,
        public author_name?: string
    ) {}
}
