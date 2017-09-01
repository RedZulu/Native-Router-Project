import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import SettingsScreen from '../components/SettingsScreen';

const nav_tab = TabNavigator({
  Main: { screen: MainScreen,
          navigationOptions: {
             headerLeft: null
          }
        },
  Profile: { screen: ProfileScreen,
          navigationOptions: {
             headerLeft: null
          }
        },
  Settings: { screen: SettingsScreen,
          navigationOptions: {
             headerLeft: null
          }
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
