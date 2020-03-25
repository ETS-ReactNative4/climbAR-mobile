import React from 'react';
import {connect} from 'react-redux';

// import RatingForm from './RatingForm';
import {rate} from '../redux/thunks/userThunks';

import {Button, Body, Text} from 'native-base';

class RatingButton extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Body>
        <Button>
          <Text>Rate it</Text>
        </Button>
      </Body>
    );
  }
}

const mapState = ({user}) => ({user});
const mapDispatch = dispatch => {
  return {
    rate: (user, route, rating) => dispatch(rate(user, route, rating)),
  };
};

export default connect(mapState, mapDispatch)(RatingButton);
