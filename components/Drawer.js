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
import Signup from './Signup';
import RouteTile from './RouteTile';
import ClimbingRoutes from './ClimbingRoutes';
import SingleClimbingRoute from './SingleClimbingRoute';
import {getUserToken} from '../redux/thunks/userThunks';
import Icon from 'react-native-vector-icons/Ionicons';

//Creating individual stacks and screen so the drawer navigation is able to wrap around as the higher order component
const HomeStack = createStackNavigator();
const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        headerStyle: {backgroundColor: '#e4572e'},
        headerTintColor: '#000',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={30}
            style={{backgroundColor: '#e4572e'}}
            onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const ClimbingRoutesStack = createStackNavigator();
const ClimbingRoutesStackScreen = ({navigation}) => (
  <ClimbingRoutesStack.Navigator>
    <ClimbingRoutesStack.Screen
      name="ClimbingRoutes"
      component={FilterDrawer}
      options={{
        title: 'Climbing Routes',
        headerStyle: {backgroundColor: '#e4572e'},
        headerTintColor: '#000',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={30}
            style={{backgroundColor: '#e4572e'}}
            onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
      }}
    />
    <ClimbingRoutesStack.Screen
      name="AllClimbingRoutes"
      component={ClimbingRoutes}
    />
    <ClimbingRoutesStack.Screen
      name="SingleClimbingRoute"
      component={SingleClimbingRoute}
      options={{
        title: 'Selected Climbing Route',
      }}
    />
  </ClimbingRoutesStack.Navigator>
);

const SignUpStack = createStackNavigator();
const SignUpStackScreen = ({navigation}) => (
  <SignUpStack.Navigator>
    <SignUpStack.Screen
      name="Signup"
      component={Signup}
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
  logOutAsync = () => {
    this.props
      .removeUserToken()
      .then(() => {})
      .catch(error => this.setState({error}));
  };
  render() {
    const {token, climbingRoutes} = this.props;
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
const mapDispatch = dispatch => {
  return {
    getUserToken: () => dispatch(getUserToken()),
  };
};

export default connect(mapState, mapDispatch)(DrawerNavigation);
