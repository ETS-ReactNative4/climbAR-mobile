import React from 'react';
import {connect} from 'react-redux';
import {markComplete, unComplete} from '../redux/thunks/userThunks';

import {Left, Right, Body, Text, Button, Icon} from 'native-base';

class CompleteButon extends React.Component {
  constructor() {
    super();
    this.completedRoute = this.completedRoute.bind(this);
    this.complete = this.complete.bind(this);
  }
  completedRoute() {
    if (!this.props.user.completedRoutes) return false;
    return (
      this.props.user.completedRoutes.filter(
        _r => _r.climbingRouteId === this.props.route.id,
      )[0] && true
    );
  }
  complete() {
    if (!this.props.user.userType) {
      alert('Log in to complete a route!');
      return;
    }
    if (this.completedRoute()) {
      this.props.unComplete(this.props.user, this.props.route);
    } else {
      this.props.markComplete(this.props.user, this.props.route);
    }
  }
  render() {
    const {route} = this.props;
    return (
      <Body>
        <Button onPress={this.complete}>
          {this.completedRoute() ? (
            <Icon type="MaterialIcons" name="done" />
          ) : (
            <Icon type="MaterialIcons" name="done" />
          )}
        </Button>
        <Text>{route.completedRoutes.length}</Text>
      </Body>
    );
  }
}

const mapState = ({user}) => ({user});
const mapDispatch = dispatch => {
  return {
    markComplete: (user, route) => dispatch(markComplete(user, route)),
    unComplete: (user, route) => dispatch(unComplete(user, route)),
  };
};

export default connect(mapState, mapDispatch)(CompleteButon);
