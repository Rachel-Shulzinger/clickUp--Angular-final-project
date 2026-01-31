import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { User } from "../../models/user.model";
import { computed } from "@angular/core";


export interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
}

export const initialUserState: UserState = {    
    users: [],
    isLoading: false,
    error: null
};  

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialUserState),
    withComputed(({ users, isLoading, error }) => ({
        allUsers: computed(() => users()),
        loading: computed(() => isLoading()), 
        userError: computed(() => error()),
        hasUsers: computed(() => users().length > 0)
    })),

    withMethods((store) => ({
        setLoading(isLoading: boolean): void {
            patchState(store, { isLoading, error: null });
        },
        setUsersSuccess(users: User[]): void {
            patchState(store, { users, isLoading: false, error: null });
        },
        setUsersFailure(error: string): void {
            patchState(store, { isLoading: false, error, users: [] });
        }
    }))
);