import React from 'react';
import {connect} from 'react-redux';

// import RatingForm from './RatingForm';
import {rate} from '../redux/thunks/userThunks';
import {openRatingFormDrawer} from '../redux/actions.js';

import {Button, Text} from 'native-base';

class RatingButton extends React.Component {
  constructor() {
    super();
    this.rateThisRoute = this.rateThisRoute.bind(this);
  }

  rateThisRoute() {
    this.props.openRatingFormDrawer(this.props.route);
  }

  render() {
    return (
      <Button rounded bordered onPress={this.rateThisRoute}>
        <Text style={{color: '#000'}}>Rate it</Text>
      </Button>
    );
  }
}

const mapState = ({user}) => ({user});
const mapDispatch = (dispatch) => {
  return {
    rate: (user, route, rating) => dispatch(rate(user, route, rating)),
    openRatingFormDrawer: (route) => dispatch(openRatingFormDrawer(route)),
  };
};

export default connect(mapState, mapDispatch)(RatingButton);
