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
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Field, reduxForm} from 'redux-form';
import InputText from './InputText';
import {createUser, saveUserToken} from '../redux/thunks/userThunks';

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
  loginTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  errorText: {
    color: '#e4572e',
    fontSize: 12,
    paddingHorizontal: 16,
  },
});

class Signup extends Component {
  constructor() {
    super();
  }
  loginScreen = () => {
    this.props.navigation.navigate('Login');
  };

  renderTextInput = (field) => {
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
          secureTextEntry={secureTextEntry}
          {...restInput}
        />
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  };

  render() {
    const {handleSubmit} = this.props;

    return (
      <View style={styles.container} onSubmit={handleSubmit}>
        <View style={styles.logoContainer}>
          <Image
            style={{width: 350, height: 85}}
            source={require('./../public/logo.png')}
          />
          <Text> Welcome to ClimbAR </Text>
        </View>
        <Text> Create your account for ClimbAR </Text>
        <Field
          style={styles.inputBox}
          name="email"
          label="email"
          placeholder="Email"
          component={this.renderTextInput}
        />
        <Field
          style={styles.inputBox}
          name="password"
          label="password"
          placeholder="Password"
          component={this.renderTextInput}
          secureTextEntry={true}
        />
        <Field
          style={styles.inputBox}
          name="confirmPassword"
          label="confirmPassword"
          placeholder="Confirm Password"
          component={this.renderTextInput}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}> Sign Up </Text>
        </TouchableOpacity>
        <View style={styles.loginTextContainer}>
          <Text> Already have an account?</Text>
          <TouchableOpacity onPress={this.loginScreen}>
            <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// creating validate function
const validate = (values) => {
  const errors = {};
  const {email, password, confirmPassword} = values;
  if (!email) {
    errors.email = 'Email is required';
  }
  if (!password) {
    errors.password = 'Password is required';
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Please Confirm your password';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
};

const mapState = ({token}) => ({token});

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (email, password) => dispatch(createUser(email, password)),
    saveUserToken: () => dispatch(saveUserToken()),
  };
};
//composing the functions with connect and redux form
export default compose(
  connect(mapState, mapDispatchToProps),
  reduxForm({
    form: 'register',
    validate,
  }),
)(Signup);
