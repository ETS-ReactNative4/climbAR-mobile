import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import climbingRoutes from './ClimbingRoutes'; 
const Stack = createStackNavigator();

//function to create a new stack navigator, pass an object into function to configure what different screens we want to register for this stack navigator
export default Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ClimbingRoutes" component={climbingRoutes}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};
