import firebase from 'firebase';
import {
  USER_UPDATE,
  USER_FETCH_SUCCESS,
  USER_SAVE_SUCCESS,
  DISPLAY_NAME_CHANGED,
  PROFILE_PIC_CHANGED
} from './types';

export const profilePicChanged = (text) => {
  return {
    type: PROFILE_PIC_CHANGED,
    payload: text
  }
}

export const displayNameChanged = (text) => {
  return {
    type: DISPLAY_NAME_CHANGED,
    payload: text
  };
};

export const userUpdate = ({ prop, value }) => {
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  };
};

export const userFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}`)
      .on('value', snapshot => {
        dispatch({ type: USER_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const userSave = ({ displayName }) => {
  return (dispatch) => {
    firebase.auth().currentUser.updateProfile({ displayName })
    .then( () => {
      dispatch({ type: USER_SAVE_SUCCESS })
    })
  };
};
