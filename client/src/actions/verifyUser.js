import * as api from '../api/index.js'
import { Auth } from './Auth.js';
import swal from 'sweetalert';
export const verifyUser = (inputs) => async (dispatch) => {
    try {
        console.log('success to verifyUser :', inputs)
        const { data } = await api.verifyUser(inputs);
        console.log(data, 'returnnnnnnn from verifyUser ')
        if (data !== "User doesn't exist") {
            window.localStorage.setItem("username", data.username);
            window.localStorage.setItem("userId", data.userId);
            dispatch({ type: 'verifyUser', payload: data })
            dispatch(Auth(data))
            swal("YOU ARE LOGGED IN SUCCESSFULLY!", "welcome!", "success");
            setInterval(function () { window.location = `/userPro/${window.localStorage.userId}`; }, 2000);
        } else {
            swal("User Doesn't Exist, Please Enter an Existing Username", { dangerMode: true });
        }
    }
    catch (error) {
        console.log('failed to verify')
        console.log(error)
        swal("Wrong Password, Please Enter an Existing Passsword", { dangerMode: true });
    }
}