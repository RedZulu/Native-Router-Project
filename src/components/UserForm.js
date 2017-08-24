import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { userUpdate } from '../actions';
import { CardSection, Input } from './common';

class UserForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Username"
            placeholder="Jane"
            value={this.props.displayName}
            onChangeText={value => this.props.userUpdate({ prop: 'displayName', value })}
          />
        </CardSection>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = (state) => {
  const { displayName } = state.userForm;

  return { displayName }
};

export default connect(mapStateToProps, { userUpdate })(UserForm);
