import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userUpdate, userSave, displayNameChanged } from '../actions';
import { Card, CardSection, Button } from './common';
import UserForm from './UserForm';

class SettingsScreen extends Component {
  componentWillMount() {
    _.each(this.props.user, (value, prop) => {
      this.props.userUpdate({ prop, value });
    });
  }

    onDisplayNameChange(text) {
      this.props.displayNameChanged(text);
    }

    onUpdatePress() {
      const { displayName } = this.props;

      this.props.userSave({ displayName });
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
  const { displayName } = state.userForm;

  return { displayName };
};

export default connect(mapStateToProps, {userUpdate, userSave})(SettingsScreen);
