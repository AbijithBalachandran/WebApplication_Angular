

import { createReducer , on } from "@ngrx/store";
import {updateStudentProfileSuccess} from "../actions/student.action"
import { Student } from "../../models/student";

export interface State{
    student:Student | null;
}

export const initialState:State ={
    student:null,
};

export const studentReducer = createReducer(
    initialState, 
    on(updateStudentProfileSuccess ,(state,{student})=>({
        ...state,
        student:student
    }))
);

