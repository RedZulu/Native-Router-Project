import {
  USER_UPDATE,
  USER_SAVE_SUCCESS,
  DISPLAY_NAME_CHANGED,
  PROFILE_PIC_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  displayName: '',
  profilePic: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_PIC_CHANGED:
      return { ...state, profilePic: action.payload };
    case DISPLAY_NAME_CHANGED:
      return { ...state, displayName: action.payload };
    case USER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_SAVE_SUCCESS:
      return { ...state };
    default:
      return state;
  }
}
