const redux = require("redux")
const axios = require("axios")
const reduxLogger = require("redux-logger")
const thunkMiddleware = require("redux-thunk").default
const applyMiddleware = redux.applyMiddleware
const createReduxStore = redux.createStore 
const combineReducers = redux.combineReducers
const logger = reduxLogger.createLogger()

const initialState = {
    loading:false,
    users:[],
    error:""
}

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED"
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS"
const FETCH_USER_ERROR = "FETCH_USER_ERROR"

const fetchUserRequested = () => {
    return{
        type:FETCH_USER_REQUESTED,
    }
}

const fetchUserSuccess = (data) => {
    return{
        type:FETCH_USER_SUCCESS,
        payload:data
    }
}

const fetchUserFailure = (error) =>  {
     return{
        type:FETCH_USER_ERROR,
        payload:error
     }
}

const reducer = (state = initialState , action) => {
    switch(action.type){
        case FETCH_USER_REQUESTED:
            return{
                ...state,
                loading:true
            }
        case FETCH_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                error:'',
                users:action.payload
            }
        case FETCH_USER_ERROR:
            return{
                ...state,
                loading:false,
                users:[],
                error:action.payload 
            }
        default:
            return state
    }
}

const fetchUser = () => {
    return function(dispatch){
        dispatch(fetchUserRequested())
        axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
            const users = response.data.map(user => user.id) 
            dispatch(fetchUserSuccess(users))
        }).catch((err) => {
            dispatch(fetchUserFailure(err.message))
           // err.message
        })
    }
}
const roorReducer = combineReducers({
    reducer:reducer,
}) 
 const store = createReduxStore(roorReducer, applyMiddleware(thunkMiddleware)) 
 store.subscribe(() => console.log(store.getState()))
 store.dispatch(fetchUser())