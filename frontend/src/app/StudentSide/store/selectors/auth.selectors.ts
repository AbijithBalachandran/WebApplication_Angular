

import { createFeatureSelector ,createSelector } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducer";

export const selectAuthState  = createFeatureSelector<AuthState>("auth");

export const selectStudent = createSelector(
    selectAuthState,(state)=>state.student
);

export const selectToken = createSelector(
    selectAuthState,(state)=>state.token
)

