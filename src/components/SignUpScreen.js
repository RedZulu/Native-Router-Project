import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { emailChanged, passwordChanged, signUpUser, userSave, loginUser, displayNameChanged, profilePicChanged } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Text, View, TouchableOpacity, Image } from 'react-native';

class SignUpScreen extends Component {
  openPicker() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true
    }).then(image => {
      const imagePath = image.path;
      this.props.profilePicChanged(imagePath);
    });

  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onProfilePicChange(text) {
    this.props.profilePicChanged(text);
  }

  onDisplayNameChange(text) {
    this.props.displayNameChanged(text);
  }

  onButtonPress() {
    const { email, password, displayName, photoURL } = this.props;

    this.props.signUpUser({ email, password, displayName, photoURL });
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
    const picCheck = this.props.photoURL ? (
      <TouchableOpacity style={styles.imagePic} onPress={ () => this.openPicker() }>
        <Image
         style={{width: 100, height: 100, margin: 5, borderRadius: 50}}
         source={{uri: this.props.photoURL}}
         />
      </TouchableOpacity>
    ):(
      <Button onPress={this.openPicker.bind(this)}>
        Profile Picture
      </Button>
    );

    return(
      <Card style={styles.container}>
        <CardSection>
          {picCheck}
        </CardSection>
        <CardSection>
          <Input
            label="Username"
            placeholder="Jane"
            onChangeText={this.onDisplayNameChange.bind(this)}
            value={this.props.displayName}
          />
        </CardSection>

        <CardSection>
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
      </Card>
        );
      }
  }

SignUpScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

SignUpScreen.navigationOptions = {
  title: 'Sign Up',
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imagePic: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, displayName, photoURL } = auth;

  return { email, password, displayName, photoURL, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, displayNameChanged, profilePicChanged, loginUser, userSave, signUpUser
})(SignUpScreen);
