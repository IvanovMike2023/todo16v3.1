import {Dispatch} from 'redux'
import {
    SetAppErrorActionType,
    setAppInitializedAC, SetAppInitializedType,
    setAppStatusAC,
    SetAppStatusActionType,
} from '../../app/app-reducer'
import {AuthAPI, LoginType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState
type ErrorType = {
    message: string
}
export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value}) as const

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await AuthAPI.AuthMe(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error as ErrorType, dispatch)
    }
}
export const meTC = () => {
    return async (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await AuthAPI.me()
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        } catch (error) {
            handleServerNetworkError(error as ErrorType, dispatch)
        } finally {
            dispatch(setAppInitializedAC(true))
        }

    };
}
export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await AuthAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error as ErrorType, dispatch)
    }
}
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
    | SetAppInitializedType