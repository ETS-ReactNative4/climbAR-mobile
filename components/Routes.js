import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import FilterDrawer from './FilterDrawer';
const Stack = createStackNavigator();

import {getUserToken} from '../redux/thunks/userThunks';

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
    this.props.getUserToken().catch(error => console.error(error));
  };

  render() {
    console.log(this.props.token.token);
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.props.token.token === null ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="ClimbingRoutes" component={FilterDrawer} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapState = ({token}) => ({token});
const mapDispatch = dispatch => {
  return {
    getUserToken: () => dispatch(getUserToken()),
  };
};

export default connect(mapState, mapDispatch)(Navigator);
