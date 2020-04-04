import React from 'react';
import {connect} from 'react-redux';
import {fetchSingleClimbingRoute} from '../redux/thunks/climbingRoutesThunks';
import {user} from '../redux/reducers';
import RouteTile from './RouteTile';
import LoadSpinner from './LoadSpinner';
import {
  Container,
  Header,
  Content,
  Text,
  Card,
  CardItem,
  Icon,
  View,
} from 'native-base';

class SingleClimbingRoute extends React.Component {
  render() {
    return (
      <Container>
        <Text> Grade:</Text>
      </Container>
    );
  }
}

const mapState = ({climbingRoute}) => ({climbingRoute});

const mapDispatch = dispatch => {
  return {
    fetchSingleClimbingRoute: id => dispatch(fetchSingleClimbingRoute(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleClimbingRoute);
