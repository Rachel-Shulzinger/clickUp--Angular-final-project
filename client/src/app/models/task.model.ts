export class Task {
    constructor(
        public id?: string,
        public title: string = '',
        public description?: string,
        public status: TaskStatus = TaskStatus.TODO,
        public priority: TaskPriority = TaskPriority.NORMAL,
        public projectId: string = '',
        public assignedTo?: string,
        public dueDate?: Date,
        public createdBy?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}
}

export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    DONE = 'done'
}

export enum TaskPriority {
    LOW = 'low',
    NORMAL = 'normal',
    HIGH = 'high'
}

