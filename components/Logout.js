import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Text, Button} from 'native-base';
import axios from 'axios';
import ClimbingRoutes from './ClimbingRoutes';
import {removeUserToken} from '../redux/thunks/userThunks';

class LogOutScreen extends Component {
  logOutAsync = () => {
    this.props
      .removeUserToken()
      .then(() => {})
      .catch(error => this.setState({error}));
  };
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button onPress={this.logOutAsync} />
      </View>
    );
  }
}

const mapState = ({token}) => ({token});
const mapDispatch = dispatch => {
  return {
    removeUserToken: () => dispatch(removeUserToken()),
  };
};

export default connect(mapState, mapDispatch)(LogOutScreen);
