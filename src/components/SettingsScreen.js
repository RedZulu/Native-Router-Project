import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userUpdate, userSave, displayNameChanged, profilePicChanged } from '../actions';
import { Card, CardSection, Button } from './common';
import UserForm from './UserForm';

class SettingsScreen extends Component {
    componentWillMount() {
      _.each(this.props.auth.user, (value, prop) => {
        this.props.userUpdate({ prop, value });
      });
    }

    onProfilePicChange(text) {
      this.props.profilePicChanged(text);
    }

    onDisplayNameChange(text) {
      this.props.displayNameChanged(text);
    }

    onUpdatePress() {
      const { displayName, photoURL } = this.props;

      this.props.userSave({ displayName, photoURL });
    }

    onProfilePress() {
      this.props.navigation.navigate('Profile');
    }

    render() {
        return(
          <Card>
            <UserForm />
            <CardSection>
              <Button onPress={this.onUpdatePress.bind(this)}>
                Save Changes
              </Button>
            </CardSection>
          </Card>
        );
    }
}

SettingsScreen.navigationOptions = {
    title: 'Settings',
};

const mapStateToProps = (state) => {
  const { displayName, photoURL } = state.userForm;
  const auth = state.auth;

  return { displayName, photoURL, auth };
};

export default connect(mapStateToProps, {userUpdate, userSave})(SettingsScreen);
