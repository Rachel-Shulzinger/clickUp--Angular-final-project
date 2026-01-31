import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Project } from "../../models/project.model";
import { computed } from "@angular/core";


export interface ProjectState {
    projects: Project[];
    isLoading: boolean;
    error: string | null;
}

export const initialProjectState: ProjectState = {
    projects: [],
    isLoading: false,
    error: null
};

export const ProjectStore = signalStore(
    { providedIn: 'root' },
    withState(initialProjectState),
    withComputed(({ projects, isLoading, error }) => ({
        allProjects: computed(() => projects()),
        loading: computed(() => isLoading()),
        projectError: computed(() => error()),
        hasProjects: computed(() => projects().length > 0)
    })),

    withMethods((store) => ({
        setLoading(isLoading: boolean): void {
            patchState(store, { isLoading, error: null });
        },
        setProjectsSuccess(projects: Project[]): void {
            patchState(store, { projects, isLoading: false, error: null });
        },
        setProjectsFailure(error: string): void {
            patchState(store, { isLoading: false, error, projects: [] });
        }
    }))
);