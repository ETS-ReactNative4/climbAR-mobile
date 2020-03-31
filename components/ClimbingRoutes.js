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

  logOutAsync = () => {
    this.props
      .removeUserToken()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => this.setState({error}));
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
            <Button primary onPress={this.logOutAsync}>
              <Text>I'm done, log me out.</Text>
            </Button>
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

const mapState = ({
  climbingRoutes,
  user,
  routeFilters,
  filterDrawer,
  token,
}) => ({
  climbingRoutes,
  user,
  routeFilters,
  filterDrawer,
  token,
});

const mapDispatch = dispatch => {
  return {
    fetchClimbingRoutes: () => dispatch(fetchClimbingRoutes()),
    toggleFilterDrawer: () => dispatch(toggleFilterDrawer()),
    removeUserToken: () => dispatch(removeUserToken()),
  };
};

export default connect(mapState, mapDispatch)(ClimbingRoutes);
