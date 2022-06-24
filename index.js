const redux = require("redux")
const reduxLogger = require("redux-logger")

const applyMiddleware = redux.applyMiddleware
const createReduxStore = redux.createStore 
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const logger = reduxLogger.createLogger()


const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = "CAKE_RESTOCKED"
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTORED = "ICECREAM_RESTORED"


function ReStockCake(qty =1){
    return{
        type:CAKE_RESTOCKED,
        payload:qty
    }
}

function cakeOrdered(){
    return{
        type:CAKE_ORDERED,
        payload:1
    }
}

function ReStockIceCream(qty=1){
    return{
        type:ICECREAM_RESTORED ,
        payload:qty
    }
}

function IceCreamOrdered(){
    return{
        type:ICECREAM_ORDERED,
        payload:1
    }
}
const initilaCakeState = {
    numOfCakes:10
}
const InitialIceCreamState = {
    numberOfIceCreams:20
}
// const initilalStete = {
//     numOfCakes:10,
//     numberOfIceCreams:10
  
// }


const cakeReducer = (state = initilaCakeState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return{
                ...state,
                numOfCakes:state.numOfCakes-1
            }
        case CAKE_RESTOCKED:
            return{
                ...state,
                numOfCakes:state.numOfCakes + action.payload
            }
        default:
            return state
    }
}

const iceCreamReducer = (state = InitialIceCreamState, action) => {
    switch(action.type){
        case ICECREAM_ORDERED:
            return{
                ...state,
                numberOfIceCreams:state.numberOfIceCreams - 1
            }
        case ICECREAM_RESTORED:
            return{
                ...state,
                numberOfIceCreams:state.numberOfIceCreams + action.payload
            }
        default:
            return state
    }
}

const roorReducer = combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
}) 
 const store = createReduxStore(roorReducer, applyMiddleware(logger)) 
console.log("initial store",store.getState());
const unsubscribe =  store.subscribe(() => {})
// store.dispatch(cakeOrdered())
// store.dispatch(cakeOrdered()) 
// store.dispatch(cakeOrdered())
// store.dispatch(ReStockCake(3))
const actions = bindActionCreators({cakeOrdered,ReStockCake}, store.dispatch)
actions.cakeOrdered()
actions.cakeOrdered()
actions.cakeOrdered()
actions.cakeOrdered()
actions.cakeOrdered()
actions.ReStockCake(5)
unsubscribe()
