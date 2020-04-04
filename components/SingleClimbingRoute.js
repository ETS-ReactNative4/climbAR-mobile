import React from 'react';
import {connect} from 'react-redux';
import {fetchSingleClimbingRoute} from '../redux/thunks/climbingRoutesThunks';
import RouteTile from './RouteTile';
import {
  Container,
  Header,
  Text,
  Icon,
  View,
} from 'native-base';

import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const holdColorDictionary = {
  '#a61901': 'Red',
  '#ce7801': 'Orange',
  '#fffe06': 'Yellow',
  '#48ac10': 'Green',
  '#0433ff': 'Blue',
  '#531b93': 'Purple',
  '#565656': 'Black',
  '#ededed': 'White',
};

class SingleClimbingRoute extends React.Component {
  componentDidMount() {
    const climbingRouteId = this.props.route.params.climbingRouteId;
    this.props.fetchSingleClimbingRoute(climbingRouteId);
  }
  render() {
    const {climbingRoute} = this.props;
    return (
      <Container>
        <Text> Grade: {climbingRoute.grade}</Text>
        <Text> Hold Color: {holdColorDictionary[climbingRoute.holdColor]}</Text>
        <Text> Expiring On: {climbingRoute.endDate}</Text>
      </Container>
    );
  }
}

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
});
const mapState = ({climbingRoute}) => ({climbingRoute});
const mapDispatch = dispatch => {
  return {
    fetchSingleClimbingRoute: id => dispatch(fetchSingleClimbingRoute(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleClimbingRoute);
