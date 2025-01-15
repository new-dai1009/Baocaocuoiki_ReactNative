

const initialState = {
        user: null,
        addresses: [],  
   
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER": 
            return {
                ...state,
                user: action.payload
            };
        case "REMOVE_USER": 
            return {
                ...state,
                user: null
            };
        case "SET_ADDRESS_USER":{
            return {
                ...state,
                addresses: action.payload
            }
        }
        default:
            return state;
    }
}

export default userReducer;
