import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

const styles = {
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  profileStyle: {
    margin: 10
  }
};

const LoginStatusMessage = ({ isLoggedIn, user, dispatch }) => {
  if (!isLoggedIn) {
    return <Text>Please log in</Text>;
  }else {
    console.log(user);
  }
  return (
    <View>
      <Text style={styles.welcome}>
        {`You are logged in as ${user['email']} right now`}
      </Text>
    </View>
  );
};

LoginStatusMessage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user
});

export default connect(mapStateToProps)(LoginStatusMessage);
