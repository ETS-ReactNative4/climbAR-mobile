import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeUserToken} from '../redux/thunks/userThunks';
import {Button, Text} from 'native-base';

class LogOutScreen extends Component {
  logOutAsync = () => {
    this.props
      .removeUserToken()
      .then(() => {})
      .catch((error) => this.setState({error}));
  };
  render() {
    // this.logOutAsync();
    return (
      <Button onPress={() => this.logOutAsync()}> 
        <Text> Log out</Text> 
      </Button>
    )
  }
}

const mapState = ({token}) => ({token});
const mapDispatch = (dispatch) => {
  return {
    removeUserToken: () => dispatch(removeUserToken()),
  };
};

export default connect(mapState, mapDispatch)(LogOutScreen);
