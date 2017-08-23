import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
    return (
      <View stlye={styles.spinnerStyle}>
        <ActivityIndicator size={size || 'large'} />
      </View>
    );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export { Spinner };
