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

//Creating individual stacks and screen so the drawer navigation is able to wrap around as the higher order component
const HomeStack = createStackNavigator();
class HomeStackScreen extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }
  _bootstrapAsync = () => {
    this.props.getUserToken();
  };
  render() {
    const {token, climbingRoutes, navigation} = this.props;
    return (
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
            headerRight: () => (
              <Icon.Button
                name="ios-log-out"
                size={30}
                style={{backgroundColor: '#e4572e'}}
                onPress={() => this.props.removeUserToken()}></Icon.Button>
            ),
          }}
        />
      </HomeStack.Navigator>
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
export default connect(mapState, mapDispatch)(HomeStackScreen);
