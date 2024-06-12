import { configureStore } from "@reduxjs/toolkit";
import SignUpSlicer from "../ReduxSlicers/SignUpSlicer";
import LoginSlicer from "../ReduxSlicers/LoginSlicer";
import AddEmployeesTaskSlicer from "../ReduxSlicers/AddEmployeesTaskSlicer";
import ShowEmployeesDialogBoxSlicer from "../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import LocalStorageSlicer from "../ReduxSlicers/LocalStorageSlicer";
import ChangeSignUpFormSlicer from "../ReduxSlicers/ChangeSignUpFormSlicer";
import ChangeComponentsState from "../ReduxSlicers/ChangeComponentsState";
// import BoardSlicer from "../components/slicers/BoardSlicer";
// import counterSlice from "./slices/counter";

export const store = configureStore({
  reducer: {
    SignUpSlicer:SignUpSlicer,
    LoginSlicer:LoginSlicer,
    AddEmployeesTaskSlicer:AddEmployeesTaskSlicer,
    ShowEmployeesDialogBoxSlicer:ShowEmployeesDialogBoxSlicer,
    LocalStorageSlicer:LocalStorageSlicer,
    ChangeSignUpFormSlicer:ChangeSignUpFormSlicer,
    ChangeComponentsState:ChangeComponentsState
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;