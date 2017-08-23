import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import AppReducer from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDLFtW6RqNcT3HiRKlp6M1zrUQ5-_qW8GI",
      authDomain: "texting-54060.firebaseapp.com",
      databaseURL: "https://texting-54060.firebaseio.com",
      projectId: "texting-54060",
      storageBucket: "texting-54060.appspot.com",
      messagingSenderId: "12870802957"
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(AppReducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
