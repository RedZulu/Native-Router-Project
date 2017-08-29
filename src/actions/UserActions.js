import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
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

export const userSave = ({ displayName, photoURL }) => {
  const { currentUser } = firebase.auth();

  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  return (dispatch) => {
    if(currentUser.photoURL === photoURL){
      firebase.auth().currentUser.updateProfile({ displayName })
      .then( () => {
        dispatch({ type: USER_SAVE_SUCCESS })
      });
    }else{
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
        //userData[dpNo] = url
        //firebase.database().ref('users').child(uid).update({ ...userData})

        let obj = {}


        firebase.auth().currentUser.updateProfile({ displayName, photoURL: url })
        .then( () => {
          dispatch({ type: USER_SAVE_SUCCESS })
        });

      })
      .catch((error) => {
        console.log(error)
      })

    }
  }
};
