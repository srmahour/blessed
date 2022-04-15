import {IS_AUTH,USR} from './type';
import {AnyAction} from "redux";

const initialState : object = {
    bIsAuth : false,
    usr : {}
};

export default function reducer(state = initialState, action : AnyAction){
    switch(action.type){
        case IS_AUTH:
            return {...state, bIsAuth : action.payload};
        case USR:
            return {...state, usr : action.payload}
        default:
            return state;
    }
}