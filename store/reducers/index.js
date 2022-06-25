import { combineReducers } from "redux";
import {authReducer} from "./authReducer"
import {userReducer} from "./userReducer"
import {courseReducer} from "./courseReducer"
import {modulesReducer} from "./modulesReducer"
import {classesReducer} from "./classesReducer"
export default combineReducers({
    auth: authReducer,
    user: userReducer,
    courses: courseReducer,
    modules: modulesReducer,
    classes: classesReducer
});