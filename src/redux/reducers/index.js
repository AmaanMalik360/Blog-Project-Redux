import { combineReducers } from "redux";
import authReducers from "./authReducers";
import usersReducers from "./usersReducers";
import blogsReducers from "./blogsReducers";

const rootReducer = combineReducers({
    users: usersReducers, 
    auth: authReducers,
    blogs: blogsReducers
})

export default rootReducer;