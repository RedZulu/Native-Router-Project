import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class LoginScreen extends Component {
    onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner style={{ flex: 1 }} size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    )
  }

  render() {
      const myIcon = (<Icon name="rocket" size={30} color="#900" />)

      return(
      <Card>
        <CardSection>
            {myIcon}
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <CardSection>
          <Button
            enableEmptySections
            onPress={() => this.props.navigation.navigate('SignUp')}
          >
            Sign Up
          </Button>
        </CardSection>
      </Card>
        );
      }
  }

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

LoginScreen.navigationOptions = {
  title: 'Log In'
};

const styles = {
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
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginScreen);
