import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import NavReducer from './NavReducer';
import UserFormReducer from './UserFormReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  auth: AuthReducer,
  nav: NavReducer,
  userForm: UserFormReducer,
  user: UserReducer
});
