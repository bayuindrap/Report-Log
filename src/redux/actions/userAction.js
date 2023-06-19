import axios from "axios"
import { API_URL } from "../../helper"
import CryptoJS from 'crypto-js';

const encryptionKey = 'myEncryptionKey'

// export const loginAction = (username, password) => {
//     return async (dispatch) => {
//         try {
//             let res = await axios.get(`${API_URL}/dataUser?username=${username}&password=${password}`)
//             if (res.data.length > 0) {
//                 localStorage.setItem("data", JSON.stringify(res.data[0]))
//                 dispatch({
//                     type: "LOGIN_SUCCESS",
//                     payload: res.data[0]
//                 })
//                 return {success: true}
//             } 
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

export const loginAction = (username, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/dataUser?username=${username}&password=${password}`)
            if (res.data.length > 0) {
                const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(res.data[0]), encryptionKey).toString();
                localStorage.setItem("data", encryptedData);
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data[0]
                })
                return { success: true }
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const userAction = () => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/dataUser`)
            console.log("getuser",res)
            dispatch({
                type: "GET_USER",
                payload: res.data[0]
            })
        }catch(error) {
            console.log(error)
        }
    }
}

export const reportAction = () => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.get(`${API_URL}/report`)
            console.log("data report", res.data)
            dispatch({
                type: "GET_REPORT",
                payload: res.data
            })
        }catch(error) {
            console.log(error)
        }
    }
}


export const historyAction = () => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/report?iduser=${this.props.iduser}`)
            console.log("data report", res.data)
            dispatch({
                type: "GET_HISTORY",
                payload: res.data
            })
        }catch(error) {
            console.log(error)
        }
    }
}

export const logoutAction = () => {
    return {
        type: "LOGOUT"
    }
}

export const getDecryptedData = () => {
    const encryptedData = localStorage.getItem("data");
    if (encryptedData) {
        const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
    return null;
}

// export const keepLogin = () => async (dispatch) => {
//     try {
//       let local = getDecryptedData();
//       if (local) {
//         let res = await dispatch(loginAction(local.username, local.password));
//         if (res.success) {
//           // Set session timeout (e.g., 30 minutes)
//           const sessionTimeout = 60 * 60 * 1000; // 30 minutes in milliseconds
  
//           // Get the current timestamp
//           const currentTime = new Date().getTime();
  
//           // Get the last activity timestamp from local storage
//           const lastActivityTime = parseInt(localStorage.getItem("lastActivityTime"));
  
//           // Check if the session has expired
//           if (lastActivityTime && currentTime - lastActivityTime > sessionTimeout) {
//             // Session expired, remove user data from local storage and logout
//             localStorage.removeItem("data");
//             dispatch(logoutAction());
//             return; // Exit the function
//           }
  
//           // Update the last activity timestamp in local storage
//           localStorage.setItem("lastActivityTime", currentTime.toString());
  
//           dispatch({ type: "KEEP_LOGIN_SUCCESS" });
//         }
//       } else {
//         // No local data found, remove user data from local storage and logout
//         localStorage.removeItem("data");
//         dispatch(logoutAction());
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };



export const keepLogin = () => async (dispatch) => {
    try {
      let local = getDecryptedData();
      if (local) {
        let res = await dispatch(loginAction(local.username, local.password));
        if (res.success) {
          dispatch({ type: "KEEP_LOGIN_SUCCESS" });
        }
      } else {
        localStorage.removeItem("data"); // Remove user data from local storage
        dispatch(logoutAction())
      }
    } catch (error) {
      console.log(error);
    }
  };



// export const keepLogin = async () => {
//     try {
//         let local = getDecryptedData();
//         if (local) {
//             let res = await this.props.loginAction(local.username, local.password);
//             if (res.success) {
//                 this.setState({ loading: false });
//             }
//         } else {
//             this.setState({ loading: false });
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }


// export const GET_SPECIFIC_DATA = "GET_SPECIFIC_DATA";
// export const getSpecificData = (id) => ({
//     type: "GET_SPECIFIC_DATA",
//     payload: { id },
//   });


// export const updateReport = (data, iduser) => {
//     return async (dispatch) => {
//         try {
//             let res = await axios.post(`${API_URL}/report/${iduser}`, {

//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }