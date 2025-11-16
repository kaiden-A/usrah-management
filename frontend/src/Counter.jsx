import { useEffect, useReducer } from "react";


function reducer(state , action){

    switch(action.type){

        case "increment" : 
            return  {count : state.count + action.payload};
        case "decrement" : 
            return{count : state.count - action.payload};
        case 'reset' : 
            return{count : 0};
        default : return state
    }
}

const initialCounter = {count : 0}

function Counter(){

    const [state , dispatch] = useReducer(reducer , initialCounter);


    return(
        <div>
            <div>
                <h1>{state.count}</h1>

                <button onClick={() => dispatch({ type: "increment" , payload : 5})}>+1</button>
                <button onClick={() => dispatch({ type: "decrement" , payload : 2 })}>-1</button>
                <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
            </div>
        </div>
    )

}

export default Counter;