import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeUserToken} from '../redux/thunks/userThunks';

class LogOutScreen extends Component {
  logOutAsync = () => {
    this.props
      .removeUserToken()
      .then(() => {})
      .catch((error) => this.setState({error}));
  };
  render() {
    this.logOutAsync();
    return null;
  }
}

const mapState = ({token}) => ({token});
const mapDispatch = (dispatch) => {
  return {
    removeUserToken: () => dispatch(removeUserToken()),
  };
};

export default connect(mapState, mapDispatch)(LogOutScreen);
