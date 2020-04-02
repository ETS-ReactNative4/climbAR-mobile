import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import FilterDrawer from './FilterDrawer';
import {getUserToken} from '../redux/thunks/userThunks';

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
    this.props
      .getUserToken()
      .then(() => console.log('getUserToken got: ', this.props.token.token))
      .catch(error => console.error(error));
  };
  render() {
    const {token} = this.props;
    console.log('token is: ', token.token);

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
              <Stack.Screen name="ClimbingRoutes" component={FilterDrawer} />
            </>
          )}
        </Stack.Navigator>
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

export default connect(mapState, mapDispatch)(Navigator);
