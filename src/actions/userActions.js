import axios from 'axios'
import {
    USER_LOOGIN_REQUEST,
    USER_LOOGIN_SUCCESS,
    USER_LOOGIN_FAIL,
    USER_LOGOUT
} from "../components/userConstant"

export const login = (email,password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOOGIN_REQUEST
        })

        const config = {
            headers:
                { 'Content-type': 'application/json' }
        }

        //post request to get back token
        const { data } = await axios.post(
            '/api/users/login',
            { 'username': email,'password': password },
            config
        )

        //once the user is logged in , want to set the user into into state , including the token
        dispatch({
            type: USER_LOOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.message
        })
    }
}
