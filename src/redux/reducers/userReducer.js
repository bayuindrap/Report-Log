const INITIAL_STATE = {
    userList : []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS" :
            console.log("data reducer", action.payload)
            return {
                ...state,
                userList: action.payload
            }
            case "GET_USER" :
                return {
                    ...state,
                    userList: action.payload
                }
            default :
            return state
    }       
}