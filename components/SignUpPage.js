import React, {Component} from 'react';
import {connect} from 'react-redux';
import Signup from './Signup';
import {createUser} from '../redux/thunks/userThunks';

class SignUpPage extends Component {
  onSubmit = (values) => {
    const {email, password} = values;
    if (!email || !password) {
      return;
    }
    this.props.createUser(email, password);
  };

  render() {
    return <Signup onSubmit={this.onSubmit} />;
  }
}

const mapState = ({token}) => ({token});

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (email, password) => dispatch(createUser(email, password)),
  };
};
//composing the functions with connect and redux form
export default connect(mapState, mapDispatchToProps)(SignUpPage);
