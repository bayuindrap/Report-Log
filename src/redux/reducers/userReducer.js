const INITIAL_STATE = {
    userList : [],
    reportList: [],
    reportHistory: []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS" :
            // console.log("data reducer", action.payload)
            return {
                ...state,
                userList: action.payload
            }
            case "GET_USER" :
                return {
                    ...state,
                    userList: action.payload
                }
                // case "KEEP_LOGIN_SUCCESS" :
                //     // console.log("reducer report", action.payload)
                //     return {
                //         ...state,
                //         userList: action.payload
                //     }

            case "GET_REPORT" :
                // console.log("reducer report", action.payload)
                return {
                    ...state,
                    reportList: action.payload
                }


            case "LOGOUT":
                return INITIAL_STATE
            default :
            return state
    }       
}