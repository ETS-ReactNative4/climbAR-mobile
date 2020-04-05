import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DrawerRouter} from '@react-navigation/native';
import Navigation from './Routes';
import Home from './Home';
import FilterDrawer from './FilterDrawer';
import Login from './Login';
import SignUpPage from './SignUpPage';
import LogOutScreen from './Logout';
import RouteTile from './RouteTile';
import ClimbingRoutes from './ClimbingRoutes';
import SingleClimbingRoute from './SingleClimbingRoute';
import {getUserToken, removeUserToken} from '../redux/thunks/userThunks';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStackScreen from './HomeStack';
import ClimbingRoutesStackScreen from './ClimbinRoutesStack';

const SignUpStack = createStackNavigator();
const SignUpStackScreen = ({navigation}) => (
  <SignUpStack.Navigator>
    <SignUpStack.Screen
      name="Signup"
      component={SignUpPage}
      options={{
        headerStyle: {backgroundColor: '#e4572e'},
        headerTintColor: '#000',
      }}
    />
  </SignUpStack.Navigator>
);

const LogInStack = createStackNavigator();
const LogInStackScreen = ({navigation}) => (
  <LogInStack.Navigator>
    <LogInStack.Screen
      name="Login"
      component={Login}
      options={{
        headerStyle: {backgroundColor: '#e4572e'},
        headerTintColor: '#000',
      }}
    />
  </LogInStack.Navigator>
);

const Drawer = createDrawerNavigator();
class DrawerNavigation extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }
  _bootstrapAsync = () => {
    this.props.getUserToken();
  };
  render() {
    const {token, climbingRoutes} = this.props;
    console.log('token is: ', token.token);
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          {token.token === null ? (
            <>
              <Drawer.Screen name="Login" component={LogInStackScreen} />
              <Drawer.Screen name="Signup" component={SignUpStackScreen} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Home" component={HomeStackScreen} />
              <Drawer.Screen
                name="Climbing Routes"
                component={ClimbingRoutesStackScreen}
              />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const mapState = ({token, user}) => ({token, user});
const mapDispatch = (dispatch) => {
  return {
    getUserToken: () => dispatch(getUserToken()),
    removeUserToken: () => dispatch(removeUserToken()),
  };
};

export default connect(mapState, mapDispatch)(DrawerNavigation);
