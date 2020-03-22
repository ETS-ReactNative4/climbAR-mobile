import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchClimbingRoutes} from '../redux/thunks/climbingRoutesThunks';

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
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
      props: {climbingRoutes, user, editModel},
      filter,
    } = this;
    return (
      <Container>
        <Header>
          <Text>All Climbing Routes</Text>
        </Header>
        <Content>
          {climbingRoutes.map(climbingRoute => {
            return filter(climbingRoute) ? (
              <Card>
                <CardItem>
                  <Text>{climbingRoute.grade}</Text>
                </CardItem>
              </Card>
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

export default connect(mapState, mapDispatch)(climbingRoutes);
