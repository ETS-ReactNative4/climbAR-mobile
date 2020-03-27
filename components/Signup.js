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
import {Field, reduxForm} from 'redux-form';
import InputText from './InputText';

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

class Signup extends Component {
  loginScreen = () => {
    this.props.navigation.navigate('Login');
  };
  //destructor the inputbox
  renderTextInput = field => {
    const {
      meta: {touched, error},
      label,
      secureTextEntry,
      maxLength,
      keyboardType,
      placeholder,
      input: {onChange, ...restInput},
    } = field;
    return (
      <View>
        <InputText
          onChangeText={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          keyboardType={keyboardType}
          label={label}
          {...restInput}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={{width: 350, height: 85}}
            source={require('./../public/logo.png')}
          />
          <Text> Welcome to ClimbAR </Text>
        </View>
        <Text> Create your account for ClimbAR </Text>

        {/* <TextInput
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
        /> */}
        <Field
          style={styles.inputBox}
          name="name"
          label="name"
          placeholder="Email"
          component={this.renderTextInput}
        />
        <Field
          style={styles.inputBox}
          name="password"
          label="password"
          placeholder="Password"
          component={this.renderTextInput}
        />
        <Field
          style={styles.inputBox}
          name="confirmPassword"
          label="confirmPassword"
          placeholder="Confirm Password"
          component={this.renderTextInput}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Sign Up </Text>
        </TouchableOpacity>
        <View style={styles.LoginTextContainer}>
          <Text> Already have an account?</Text>
          <TouchableOpacity onPress={this.loginScreen}>
            <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default reduxForm({
  form: 'Signup',
})(Signup);
