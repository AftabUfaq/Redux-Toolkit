const redux = require("redux")
const produce = require("immer").produce
const createReduxStore = redux.createStore 
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const initialState = {
    name:"Aftab",
    address:{
        street:"12 Main street",
        city:"Rawalpindi",
        state:"Panjab"
    }
}
const UPDATE_STREET = 'UPDATE_StREET'

const updateStreet = (street) => {
    return{
        type:UPDATE_STREET,
        payload:street
    }
}

const streetReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_STREET:
            // return{
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street:action.payload
            //     }
            // }
            return produce(state, (draft) => {
                    draft.address.street = action.payload
            })
        default:
            return state
    }
}

const roorReducer = combineReducers({
   user:streetReducer
}) 
 const store = createReduxStore(roorReducer) 
console.log("initial store",store.getState());
const unsubscribe =  store.subscribe(() => console.log("updates store", store.getState()))
const actions = bindActionCreators({updateStreet}, store.dispatch)
actions.updateStreet("MY Updates Street")

unsubscribe()
