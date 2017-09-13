import React, { Component } from 'react';
import { View } from 'react-native';

import LoginStatusMessage from './LoginStatusMessage';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
};

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginStatusMessage />
      </View>
    );
  }
}
MainScreen.navigationOptions = {
  title: 'Home Screen',
};

export default MainScreen;
