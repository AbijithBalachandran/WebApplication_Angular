
import { createAction, props } from "@ngrx/store";
import { Student } from "../../models/student";

export const updateStudentProfileSuccess = createAction(
     '[Student] Update Student Profile Success',
     props<{student:Student}>()
)