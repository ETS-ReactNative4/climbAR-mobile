import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import ClimbingRoutes from './ClimbingRoutes';
const Stack = createStackNavigator();
import TopNav from './TopNav';

//function to create a new stack navigator, pass an object into function to configure what different screens we want to register for this stack navigator
class Navigator extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {userType: 'Admin'},
    };
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          headerShow={false}
          headerMode="none"
          header={({scene, previous, navigation}) => (
            <TopNav scene={scene} previous={previous} navigation={navigation} />
          )}
          headerStyle={{height: 80}}>
          <Stack.Screen
            name="Login"
            options={{headerShown: false, headerMode: 'none'}}
            component={Login}
          />
          <Stack.Screen name="Home" options={{}} component={Home} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ClimbingRoutes" component={ClimbingRoutes} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
