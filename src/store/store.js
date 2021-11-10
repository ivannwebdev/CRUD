import { applyMiddleware, createStore, combineReducers } from "redux"
import { usersReducer } from './reducers/usersReducer'
import thunkMiddleware from "redux-thunk"

const reducers = combineReducers({
    users: usersReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.store = store

export default store