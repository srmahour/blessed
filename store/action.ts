import {IS_AUTH,USR} from "./type";
import {Dispatch} from  "redux";

export const setAuth = (isAuth : boolean) => (dispatch : Dispatch) => {

    return dispatch({
        type:IS_AUTH,
        payload:isAuth
    });
}

export const setUsr = (usr : object) => (dispatch : Dispatch) => {
    return dispatch({
        type:USR,
        payload:usr
    });
}