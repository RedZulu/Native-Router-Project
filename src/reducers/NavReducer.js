import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  USER_SAVE_SUCCESS
} from '../actions/types';

import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

export default(state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.back(),
          state
        );
      break;
    case LOGOUT_USER:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    case USER_SAVE_SUCCESS:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Profile' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
