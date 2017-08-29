import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  DISPLAY_NAME_CHANGED,
  PROFILE_PIC_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  SIGN_UP_USER,
  SIGN_UP_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  displayName: '',
  photoURL: '',
  user: null,
  error: '',
  loading: false,
  isLoggedIn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case PROFILE_PIC_CHANGED:
      return { ...state, photoURL: action.payload };
    case DISPLAY_NAME_CHANGED:
      return { ...state, displayName: action.payload };
    case SIGN_UP_USER:
      return { ...state, loading: true, error: '' };
    case SIGN_UP_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, isLoggedIn: true};
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, isLoggedIn: true};
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed', password: '', loading: false };
    case LOGOUT_USER:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
}
