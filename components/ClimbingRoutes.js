import React, {Component} from 'react';
import {connect} from 'react-redux';

import {toggleFilterDrawer} from '../redux/actions.js';
import {fetchClimbingRoutes} from '../redux/thunks/climbingRoutesThunks';
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

class climbingRoutes extends Component {
  constructor() {
    super();
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    this.props.fetchClimbingRoutes();
  }
  filter(route) {
    const {routeFilters, user} = this.props;
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
        !user.completedRoutes.filter(_r => _r.climbingRouteId === route.id)[0]
      ) {
        return false;
      }
      if (
        filter === 'liked' &&
        routeFilters.liked &&
        !user.likedRoutes.filter(_r => _r.climbingRouteId === route.id)[0]
      ) {
        return false;
      }
    }
    return true;
  }
  render() {
    const {
      props: {
        climbingRoutes,
        user,
        editModel,
        toggleFilterDrawer,
        filterDrawer,
      },
      filter,
    } = this;
    return (
      <Container>
        {climbingRoutes.length ? (
          <Container>
            <Icon
              type="FontAwesome"
              name="filter"
              style={{margin: 5}}
              onPress={toggleFilterDrawer}
            />
            <Content>
              {climbingRoutes.map(climbingRoute => {
                return filter(climbingRoute) ? (
                  <RouteTile
                    key={climbingRoute.id}
                    route={climbingRoute}
                    user={user}
                    editModel={editModel}
                  />
                ) : (
                  ''
                );
              })}
            </Content>
          </Container>
        ) : (
          <LoadSpinner />
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

const mapDispatch = dispatch => {
  return {
    fetchClimbingRoutes: () => dispatch(fetchClimbingRoutes()),
    toggleFilterDrawer: () => dispatch(toggleFilterDrawer()),
  };
};

export default connect(mapState, mapDispatch)(climbingRoutes);
