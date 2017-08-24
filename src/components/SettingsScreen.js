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

class SettingsScreen extends Component {
    render() {

        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Settings Screen
                </Text>

                <Button
                    onPress={() => this.props.navigation.navigate('Profile')}
                    title="Profile"
                />
            </View>
        );
    }
}

SettingsScreen.navigationOptions = {
    title: 'Settings',
};

export default connect()(SettingsScreen);