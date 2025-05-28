
import { createAction,props } from "@ngrx/store";


export const loginSuccess =  createAction(
    '[Auth] Login Success',
    props<{token :string; student:any}>()
);

export const logout = createAction('[Auth] Logout');