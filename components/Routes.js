import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import ClimbingRoutes from './ClimbingRoutes';
const Stack = createStackNavigator();

import {getUserToken} from '../redux/thunks/userThunks';

//function to create a new stack navigator, pass an object into function to configure what different screens we want to register for this stack navigator
// export default Navigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Signup" component={Signup} />
//         <Stack.Screen name="ClimbingRoutes" component={climbingRoutes} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

class Navigator extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
  }
  componentDidMount() {
    this._bootstrapAsync(this.props.user.id);
  }
  _bootstrapAsync = userId => {
    this.props.getUserToken(userId).catch(error => console.error(error));
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.props.logInAuth.token === null ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={Signup} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="ClimbingRoute" component={ClimbingRoutes} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapState = ({LogInAuth, user}) => ({LogInAuth, user});
const mapDispatch = dispatch => {
  return {
    getUserToken: () => dispatch(getUserToken()),
  };
};

export default connect(mapState, mapDispatch)(Navigator);
