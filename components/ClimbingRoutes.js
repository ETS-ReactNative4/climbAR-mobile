import React, {Component} from 'react';
import {connect} from 'react-redux';

import {toggleFilterDrawer} from '../redux/actions.js';
import {fetchClimbingRoutes} from '../redux/thunks/climbingRoutesThunks';
import RouteTile from './RouteTile';
import LoadSpinner from './LoadSpinner';
import {removeUserToken} from '../redux/thunks/userThunks';

import {
  Container,
  Header,
  Content,
  Text,
  Card,
  CardItem,
  Icon,
  View,
  Button,
} from 'native-base';

class ClimbingRoutes extends Component {
  constructor() {
    super();
    this.isInFilter = this.isInFilter.bind(this);
    this.filteredRoutes = this.filteredRoutes.bind(this);
    this.userCompletedRoute = this.userCompletedRoute.bind(this);
    this.userLikedRoute = this.userLikedRoute.bind(this);
  }

  componentDidMount() {
    this.props.fetchClimbingRoutes();
  }
  userCompletedRoute(routeId) {
    const {user} = this.props;
    return user.completedRoutes.filter(
      (_r) => _r.climbingRouteId === routeId,
    )[0]
      ? true
      : false;
  }
  userLikedRoute(routeId) {
    const {user} = this.props;
    return user.likedRoutes.filter((_r) => _r.climbingRouteId === routeId)[0]
      ? true
      : false;
  }
  isInFilter(route) {
    const {
      props: {routeFilters, user},
      userCompletedRoute,
      userLikedRoute,
    } = this;

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

    for (let filter in routeFilters) {
      if (
        filter === 'grade' &&
        routeFilters.grade &&
        route.grade !== routeFilters.grade
      ) {
        return false;
      }
      if (
        filter === 'completed' &&
        routeFilters.completed &&
        userCompletedRoute(route.id) !== true
      ) {
        return false;
      }
      if (
        filter === 'liked' &&
        routeFilters.liked &&
        userLikedRoute(route.id) !== true
      ) {
        return false;
      }
      if (
        filter === 'holdColor' &&
        routeFilters.holdColor &&
        holdColorDictionary[route.holdColor] !== routeFilters.holdColor
      ) {
        return false;
      }
    }
    return true;
  }

  filteredRoutes() {
    const {
      props: {climbingRoutes, user, editModel},
      isInFilter,
    } = this;
    let filteredRoutes = [];
    for (let i = 0; i < climbingRoutes.length; i++) {
      if (isInFilter(climbingRoutes[i]))
        filteredRoutes.push(
          <RouteTile
            key={climbingRoutes[i].id}
            route={climbingRoutes[i]}
            user={user}
            editModel={editModel}
          />,
        );
    }
    return filteredRoutes.length > 0 ? (
      filteredRoutes
    ) : (
      <Text>No routes...</Text>
    );
  }

  logOutAsync = () => {
    this.props
      .removeUserToken()
      .then(() => {})
      .catch((error) => this.setState({error}));
  };

  render() {
    const {
      props: {
        climbingRoutes,
        user,
        editModel,
        toggleFilterDrawer,
        filterDrawer,
      },
      filteredRoutes,
    } = this;
    return (
      <Container>
        {climbingRoutes.length ? (
          <Container style={{backgroundColor: '#f0eae3'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Icon
                type="FontAwesome"
                name="filter"
                style={{margin: 5}}
                onPress={toggleFilterDrawer}
              />
              <Button
                rounded
                dark
                onPress={this.logOutAsync}
                style={{margin: 5}}>
                <Text style={{color: '#e4572e'}}>Log out</Text>
              </Button>
            </View>
            <Content>{filteredRoutes()}</Content>
          </Container>
        ) : (
          <LoadSpinner style={{backgroundColor: '#f0eae3'}} />
        )}
      </Container>
    );
  }
}

const mapState = ({climbingRoutes, user, routeFilters, filterDrawer}) => ({
  climbingRoutes,
  user,
  routeFilters,
  filterDrawer,
});

const mapDispatch = (dispatch) => {
  return {
    fetchClimbingRoutes: () => dispatch(fetchClimbingRoutes()),
    toggleFilterDrawer: () => dispatch(toggleFilterDrawer()),
    removeUserToken: () => dispatch(removeUserToken()),
  };
};

export default connect(mapState, mapDispatch)(ClimbingRoutes);
