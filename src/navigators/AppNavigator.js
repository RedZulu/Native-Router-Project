import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';

import { logoutUser } from '../actions'

import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import SettingsScreen from '../components/SettingsScreen';
import AuthButton from '../components/AuthButton';

const profile_drawer = DrawerNavigator ({
  Profile: {
      screen: ProfileScreen,
      navigationOptions: {
         drawerLabel: 'Profile',
          headerLeft: null
      }
  },
  Settings: {
     screen: SettingsScreen,
     navigationOptions: {
         drawerLabel: 'Settings',
     }
  },
  LogOut: {
    screen: AuthButton,
    navigationOptions: {
        drawerLabel: 'LogOut',
    }
  }
  },{
  drawerWidth: 200,
  drawerPosition: 'right',
  contentComponent: props => <DrawerItems {...{...props, onItemPress:
    (route) => {
      if(route.route.key === 'LogOut'){
        logoutUser(props.navigation.dispatch);
      }else{
        props.navigation.navigate(route.route.key);
      }
     }
  }} />
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
  tabBarPosition: 'bottom',
  backBehavior: 'none',
  headerLeft: null
});

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen,
    navigationOptions: {
      headerLeft: null
    }
  },
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
