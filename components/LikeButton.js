import React from 'react';
import {connect} from 'react-redux';
import {likeRoute, unLikeRoute} from '../redux/thunks/userThunks';

import {Left, Right, Body, Text, Button, Icon} from 'native-base';
import {StyleSheet, View} from 'react-native';

class LikeButton extends React.Component {
  constructor() {
    super();
    this.likesThisRoute = this.likesThisRoute.bind(this);
    this.like = this.like.bind(this);
  }
  likesThisRoute() {
    if (!this.props.user.likedRoutes) return false;
    return (
      this.props.user.likedRoutes.filter(
        _r => _r.climbingRouteId === this.props.route.id,
      )[0] && true
    );
  }
  like() {
    if (!this.props.user.userType) {
      alert('Log in to like a route');
      return;
    }
    if (this.likesThisRoute()) {
      this.props.unLikeRoute(this.props.user, this.props.route);
    } else {
      this.props.likeRoute(this.props.user, this.props.route);
    }
  }
  render() {
    const {route} = this.props;
    return (
      <Body style={styles.container}>
        <Button onPress={this.like} transparent>
          {this.likesThisRoute() ? (
            <Icon type="MaterialIcons" name="favorite" />
          ) : (
            <Icon type="MaterialIcons" name="favorite-border" />
          )}
        </Button>
        <View>
          <Text>{route.likedRoutes.length}</Text>
        </View>
      </Body>
    );
  }
}

const mapState = ({user}) => ({user});
const mapDispatch = dispatch => {
  return {
    likeRoute: (user, route) => dispatch(likeRoute(user, route)),
    unLikeRoute: (user, route) => dispatch(unLikeRoute(user, route)),
  };
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default connect(mapState, mapDispatch)(LikeButton);
