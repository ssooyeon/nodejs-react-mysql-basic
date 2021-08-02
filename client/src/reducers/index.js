import { combineReducers } from "redux";
import boards from "./boards";
import users from "./users";
import groups from "./groups";
import auth from "./auth";
export default combineReducers({
  boards,
  users,
  groups,
  auth,
});
