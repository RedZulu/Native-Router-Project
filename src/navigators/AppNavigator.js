import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addNavigationHelpers, StackNavigator, TabNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import SettingsScreen from '../components/SettingsScreen';
import AuthButton from '../components/AuthButton';

const profile_drawer = DrawerNavigator ({
  Profile: { screen: ProfileScreen,
          navigationOptions: {
             headerLeft: null,
             drawerLabel: 'Profile'
          }
        },
  Settings: {
     screen: SettingsScreen,
     navigationOptions: {
        drawerLabel: 'Settings'
     }
  },
  LogOut: {
    screen: AuthButton,
    navigationOptions: {
       drawerLabel: 'LogOut'
    }
  }
  },{
  drawerLabel: 'Settings',
  drawerWidth: 200,
  drawerPosition: 'right'
});

const nav_tab = TabNavigator({
  Main: { screen: MainScreen,
          navigationOptions: {
             headerLeft: null
          }
        },
  Profile: {
    name: 'Profile',
    screen: profile_drawer
  }
},{
  lazyLoad: true,
  tabBarPosition: 'bottom',
  backBehavior: 'none',
  headerLeft: null
});

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  SignUp: { screen: SignUpScreen },
  Home: { screen: nav_tab }
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
