import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Task } from "../../models/task.model";
import { computed } from "@angular/core";

export interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
}

export const initialTaskState: TaskState = {
    tasks: [],
    isLoading: false,
    error: null
};

export const TaskStore = signalStore(
    { providedIn: 'root' },
    withState(initialTaskState),
    withComputed(({ tasks, isLoading, error }) => ({
        allTasks: computed(() => tasks()),
        loading: computed(() => isLoading()),
        taskError: computed(() => error()),
        hasTasks: computed(() => tasks().length > 0)
    })),
    withMethods((store) => ({
        setLoading(isLoading: boolean): void {
            patchState(store, { isLoading });
        },
        setTasksSuccess(tasks: Task[]): void {
            patchState(store, { tasks, isLoading: false, error: null });
        },
        setTasksFailure(error: string): void {
            console.error('Task store error:', error);
            patchState(store, { isLoading: false, error });
        },
        addTask(task: Task): void {
            patchState(store, { tasks: [...store.tasks(), task] });
        },
        updateTask(taskId: string, updatedTask: Task): void {
            const tasks = store.tasks().map(task => 
                task.id === taskId ? updatedTask : task
            );
            patchState(store, { tasks });
        },
        removeTask(taskId: string): void {
            const tasks = store.tasks().filter(task => task.id !== taskId);
            patchState(store, { tasks });
        }
    }))
);