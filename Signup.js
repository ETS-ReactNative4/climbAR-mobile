import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

export default class Signup extends Component {
  loginScreen = () => {
    this.props.navigation.navigate('Login');
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={{width: 350, height: 85}}
            source={require('./public/logo.png')}
          />
          <Text> Welcome to ClimbAR </Text>
        </View>
        <Text> Create your account for ClimbAR </Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Email"
          placeholderTextColor="#e4572e"
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#e4572e"
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor="#e4572e"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Sign Up </Text>
        </TouchableOpacity>
        <View style={styles.LoginTextContainer}>
          <Text> Already have an account?</Text>
          <TouchableOpacity onPress={this.loginScreen} >
            <Text style={styles.buttonText}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0eae3',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: 'black',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#e4572e',
    textAlign: 'center',
  },
  LoginTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  LoginText: {
    color: '#e4572e',
    fontSize: 16,
  },
});
