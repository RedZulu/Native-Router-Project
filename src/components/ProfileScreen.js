import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class ProfileScreen extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Image
         style={{width: 100, height: 100, margin: 5, borderRadius: 50}}
         source={{uri: this.props.photoURL}}
         />
        <Text style={styles.welcome}>
          {this.props.displayName + "'s Profile"}
        </Text>
        <Button
          enableEmptySections
          onPress={() => this.props.navigation.navigate('Settings')}
          title="Settings"
        />
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

mapStateToProps = state => {
  const auth = state.auth;
  const displayName = state.auth.user['displayName'];
  const photoURL = state.auth.user['photoURL'];

  return { displayName, photoURL, auth };
}

export default connect(mapStateToProps)(ProfileScreen);
