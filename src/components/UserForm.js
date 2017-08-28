import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { userUpdate } from '../actions';
import { CardSection, Input, Button } from './common';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';

class UserForm extends Component {
  state = {
    profilePic: null
  };

  openPicker() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true
    }).then(image => {
      const imagePath = image.path;
      this.setState({profilePic: imagePath});
    });

  {/* var storageRef = firebase.storage().ref(user + '/profilePicture/' + file.name) */}

  }

  render() {
    const picCheck = this.state.profilePic ? (
      <TouchableOpacity onPress={ () => this.openPicker() }>
        <Image
         style={{width: 100, height: 100, margin: 5}}
         source={{uri: this.state.profilePic}}
         />
      </TouchableOpacity>
    ):(
      <Button onPress={this.openPicker.bind(this)}>
        Pick Image
      </Button>
    );

    return (
      <View>
        <CardSection>
          {picCheck}
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
