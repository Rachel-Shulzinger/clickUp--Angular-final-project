import { signalStore, withComputed, withMethods, withState, patchState } from "@ngrx/signals";
import { Team } from "../../models/team.model";
import { computed } from "@angular/core";

export interface TeamState {
    teams: Team[];
    isLoading: boolean;
    error: string | null;
}

export const initialTeamState: TeamState = {
    teams: [],
    isLoading: false,
    error: null
};

export const TeamStore = signalStore(
    { providedIn: 'root' },
    withState(initialTeamState),
    withComputed(({ teams, isLoading, error }) => ({
        allTeams: computed(() => teams()),
        loading: computed(() => isLoading()),
        teamError: computed(() => error()),
        hasTeams: computed(() => teams().length > 0)
    })),

    withMethods((store) => ({
        setLoading(isLoading: boolean): void {
            patchState(store, { isLoading, error: null });
        },
        setTeamsSucsess(teams: Team[]): void {
            patchState(store, { teams, isLoading: false, error: null });
        },
        setTeamsFailure(error: string): void {
            patchState(store, { isLoading: false, error, teams: [] });
        }
    }))
);
