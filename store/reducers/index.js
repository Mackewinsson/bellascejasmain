import { combineReducers } from "redux";
import {authReducer} from "./authReducer"
import {userReducer} from "./userReducer"
import {courseReducer} from "./courseReducer"
import {modulesReducer} from "./modulesReducer"
import {classesReducer} from "./classesReducer"
import {quizesReducer} from "./quizesReducer"
import {paymentsReducer} from "./paymentReducer"
import {questionsReducer} from "./questionsReducer"
import {servicesReducer} from "./servicesReducer"

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    courses: courseReducer,
    modules: modulesReducer,
    classes: classesReducer,
    quizes: quizesReducer,
    payment: paymentsReducer,
    questions: questionsReducer,
    services: servicesReducer
});