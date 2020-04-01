import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  onChangeText,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
  };
  onChangeHandler = (state, value) => {
    this.setState({
      [state]: value,
    });
  };

  logIn = () => {
    const {email, password} = this.state;
    if (email && password) {
      const req = {
        email: email,
        password: password,
      };
      this.setState({
        loading: true,
      });
      axios.post('http://climbar.herokuapp.com/api/users', req)
      .then(
        res => {
          this.props.navigation.navigate('Home');
          alert('Login Successful');
        },
        err => {
          this.setState({
            loading: false,
          });
          alert('Wrong Credentials');
        },
      );
    } else {
      alert('Enter Credentials');
    }
  };
  signUp = () => {
    this.props.navigation.navigate('Signup');
  };
  render() {
    const {email, password} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={{width: 350, height: 85}}
            source={require('./../public/logo.png')}
          />
          <Text> Welcome to ClimbAR </Text>
        </View>
        <TextInput
          style={styles.inputBox}
          placeholder="Email"
          placeholderTextColor="#e4572e"
          onChangeText={value => this.onChangeHandler('email', value)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#e4572e"
          onChangeText={value => this.onChangeHandler('password', value)}
        />
        <TouchableOpacity style={styles.button} onPress={this.logIn}>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
        <View style={styles.signupTextContainer}>
          <Text> Don't have an account yet?</Text>
          <TouchableOpacity onPress={this.signUp}>
            <Text style={styles.signupText}> Signup </Text>
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
  signupTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signupText: {
    color: '#e4572e',
    fontSize: 16,
  },
});
