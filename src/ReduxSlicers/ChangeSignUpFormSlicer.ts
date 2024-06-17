import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    changeSignUpForm: true,
    changeLoginForm: true
}

export const ChangeSignUpFormSlicer = createSlice({
    name: "ChangeSignUpFormSlicer",
    initialState,
    reducers: {
        setChangeSignUpForm: (state, action) => {
            state.changeSignUpForm = action.payload;
        },
        setChangeLoginForm: (state, action) => {
            state.changeLoginForm = action.payload;
        }
    }
})

export const { setChangeSignUpForm, setChangeLoginForm } = ChangeSignUpFormSlicer.actions;

export default ChangeSignUpFormSlicer.reducer