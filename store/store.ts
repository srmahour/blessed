import {createStore, applyMiddleware, combineReducers } from "redux";
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";
import thunk from "redux-thunk";


//combine for now 1
const combinedReducer  = combineReducers({
    reducer
});

//bind middleware for dev

const bindMiddleware = (middleware : any) => {
    if (process.env.NODE_ENV !== 'production'){
        const { composeWithDevTools} = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware);
};

 const makeStore = ({isServer}) => {
  if (isServer){
      // @ts-ignore
      return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
  }else{
    const {persistStore , persistReducer} = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
        key:'bfs',
        storage
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducer);

    const store = createStore(persistedReducer,bindMiddleware([thunkMiddleware]));
    // @ts-ignore
    store.__persistor = persistStore(store);
    return store;
  }
};

// @ts-ignore
export const wrapper = createWrapper(makeStore);