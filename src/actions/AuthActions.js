import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import {
   EMAIL_CHANGED,
   PASSWORD_CHANGED,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_FAIL,
   LOGIN_USER,
   LOGOUT_USER,
   SIGN_UP_USER,
   SIGN_UP_USER_SUCCESS
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const signUpUser = ({email, password, displayName, photoURL}) => {
  return (dispatch) => {
    dispatch({ type: SIGN_UP_USER })

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {

        const { currentUser } = firebase.auth();

        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        let uploadBlob = null;
        // const imageRef = firebase.storage().ref(currentUser.uid).child("profileImg.jpg");

        const imageRef = firebase.storage().ref(currentUser.uid + '/profilePicture/profileImg.jpg')
        let mime = 'image/jpg';

        fs.readFile(photoURL, 'base64')
        .then((data) => {
          //console.log(data);
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          let userData = {}
          let obj = {}

          firebase.auth().currentUser.updateProfile({ displayName, photoURL: url })
          .then( () => {
            signUpUserSuccess(dispatch, user);
          });

        })
        .catch((error) => {
          console.log(error)
        })
      })
      .catch((error) => {
        console.log(error);
        loginUserFail(dispatch)
      });
  };
};

const signUpUserSuccess = (dispatch, user) => {
  dispatch({
    type: SIGN_UP_USER_SUCCESS,
    payload: user
  });
};

export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => { loginUserSuccess(dispatch, user) })
      .catch((error) => {
        console.log(error);
        loginUserFail(dispatch);
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};


export const logoutUser = (dispatch) => {
  dispatch({ type: LOGOUT_USER });

  firebase.auth().signOut();
}
