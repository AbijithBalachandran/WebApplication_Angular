
import { createReducer ,on } from "@ngrx/store";
import { loginSuccess ,logout } from "../actions/auth.actions";

export interface AuthState{
    token:string|null;
    student:any|null;
};


export const initialState:AuthState ={
    token:null,
    student:null,
};

export const authReducer = createReducer(
    initialState,
    on(loginSuccess,(state,{token,student})=>({
        ...state,
        token,
        student
    })),
    on(logout,()=> initialState)
);

