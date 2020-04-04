import React from 'react';
import {connect} from 'react-redux';
import {fetchSingleClimbingRoute} from '../redux/thunks/climbingRoutesThunks';
import RouteTile from './RouteTile';
import {Container, Header, Text, Icon, View} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LoadSpinner from './LoadSpinner';

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
  viewModel = id => {
    this.props.navigation.navigate('RouteModel', {
      climbingRouteId: id,
    });
  };
  componentDidMount() {
    const climbingRouteId = this.props.route.params.climbingRouteId;
    this.props.fetchSingleClimbingRoute(climbingRouteId);
  }
  render() {
    const {climbingRoute} = this.props;
    return (
      <Container>
        {climbingRoute ? (
          <Container style={styles.container}>
            <Text> Grade: {climbingRoute.grade}</Text>
            <View style={styles.hold}>
              <Text
                style={{
                  backgroundColor: `${climbingRoute.holdColor}`,
                }}>
                Hold Color:
                {holdColorDictionary[climbingRoute.holdColor]}
              </Text>
            </View>
            <Text> Expiring On: {climbingRoute.endDate}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.viewModel(climbingRoute.id)}>
              <Text style={styles.buttonText}> View Model </Text>
            </TouchableOpacity>
          </Container>
        ) : (
          <LoadSpinner style={{backgroundColor: '#f0eae3'}} />
        )}
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
  button: {
    width: 200,
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
});

const mapState = ({climbingRoute}) => ({climbingRoute});
const mapDispatch = dispatch => {
  return {
    fetchSingleClimbingRoute: id => dispatch(fetchSingleClimbingRoute(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleClimbingRoute);
