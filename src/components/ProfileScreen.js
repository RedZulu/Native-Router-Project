import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';

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
        <Text style={styles.welcome}>
          {this.props.auth.user['displayName'] + "'s Profile"}
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

  return { auth };
}

export default connect(mapStateToProps)(ProfileScreen);
