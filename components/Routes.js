import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import FilterDrawer from './FilterDrawer';
import {getUserToken} from '../redux/thunks/userThunks';
import SingleClimbingRoute from './SingleClimbingRoute';
import {fetchClimbingRoutes} from '../redux/thunks/climbingRoutesThunks';
import RouteTile from './RouteTile';
import ClimbingRoutes from './ClimbingRoutes';
import RouteModel from './RouteModel'; 

const Stack = createStackNavigator();
//function to create a new stack navigator, pass an object into function to configure what different screens we want to register for this stack navigator
class Navigator extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
  }
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = () => {
    this.props.getUserToken();
  };
  render() {
    const {token, climbingRoutes} = this.props;
    console.log('TOKEN IS ', token);
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {token.token == null ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="ClimbingRoutes"
                component={FilterDrawer}
                options={{title: 'All Climbing Routes'}}
              />
              <Stack.Screen
                name="AllClimbingRoutes"
                component={ClimbingRoutes}
              />
              <Stack.Screen name="RouteTile" component={RouteTile} />
              <Stack.Screen
                name="SingleClimbingRoute"
                component={SingleClimbingRoute}
                options={{title: 'Selected Climbing Route'}}
              />
              <Stack.Screen
                name="RouteModel"
                component={RouteModel}
                options={{title: 'Selected Route Model'}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapState = ({token, user}) => ({
  token,
  user,
});
const mapDispatch = dispatch => {
  return {
    getUserToken: () => dispatch(getUserToken()),
  };
};

export default connect(mapState, mapDispatch)(Navigator);
