import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { userUpdate } from '../actions';
import { CardSection, Input, Button } from './common';
import ImagePicker from 'react-native-image-crop-picker';

class UserForm extends Component {
  pickImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  }

  render() {
    return (
      <View>
        <CardSection>
          <Button onPress={this.pickImage.bind(this)}>
            Pick Image
          </Button>
        </CardSection>
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
