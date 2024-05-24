import {
    USER_LOOGIN_REQUEST,
    USER_LOOGIN_SUCCESS,
    USER_LOOGIN_FAIL,
    USER_LOGOUT
} from "../components/userConstant";

export const userLoginReducer = (state = {},action) => {
    switch (action.type) {
        case USER_LOOGIN_REQUEST:
            return { loading: true }; // update the object

        case USER_LOOGIN_SUCCESS:
            return { loading: false,userInfo: action.payload };

        case USER_LOOGIN_FAIL:
            return { loading: false,error: action.payload };

        case USER_LOGOUT:
            return {}

        default:
            return state;
    }
};