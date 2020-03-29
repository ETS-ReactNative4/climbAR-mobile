import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchClimbingRoutes} from '../redux/thunks/climbingRoutesThunks';
import {removeUserToken} from '../redux/thunks/userThunks';
import RouteTile from './RouteTile';

import {Container, Header, Content, Text, Card, CardItem} from 'native-base';

class ClimbingRoutes extends Component {
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
      props: {climbingRoutes, user, editModel},
      filter,
    } = this;
    return (
      <Container>
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
    );
  }
}

const mapState = ({climbingRoutes, user, routeFilters}) => ({
  climbingRoutes,
  user,
  routeFilters,
});

const mapDispatch = dispatch => {
  return {
    fetchClimbingRoutes: () => dispatch(fetchClimbingRoutes()),
  };
};

export default connect(mapState, mapDispatch)(ClimbingRoutes);
