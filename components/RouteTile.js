import React, {Component} from 'react';

import LikeButton from './LikeButton';
import CompleteButton from './CompleteButton';
// import RatingButon from './RatingButton';
import RatingDisplay from './RatingDisplay';
import {average} from '../utils';

import {Card, CardItem, Left, Right, Body, Text} from 'native-base';
import {StyleSheet} from 'react-native';

class RouteTile extends Component {
  constructor() {
    super();
    // this.editRoute = this.editRoute.bind(this);
  }
  //   editRoute() {
  //     this.props.editModel(this.props.route);
  //     this.props.history.push('https://climbar.herokuapp.com/admin/create');
  //   }
  render() {
    const {route, user, editModel} = this.props;
    const component = this;
    const avgRating = average(route.ratings, 'rating');
    const daysToExpire = () => {
      const expDate = new Date(route.endDate).getTime();
      const today = new Date().getTime();
      const hoursToExpire = Math.floor((expDate - today) / (1000 * 60 * 60));
      if (hoursToExpire <= 24) return 'Today';
      return `In ${Math.floor(hoursToExpire / 24)} days`;
    };
    const darkColor = route =>
      ['black', 'green', 'purple'].indexOf(route.holdColor) !== -1;

    console.log(user);
    //to do: add link to grade
    return (
      <Card>
        <CardItem
          style={{backgroundColor: route.holdColor, justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>{route.grade}</Text>
        </CardItem>
        <CardItem>
          <LikeButton route={route} />
          <CompleteButton route={route} />
        </CardItem>
        <CardItem>
          <RatingDisplay avgRating={avgRating} />
          <Text>Difficulty</Text>
          {/* {user.userType && <RatingButon route={route} />} */}
          <Text>Expiring {daysToExpire()} </Text>
        </CardItem>
      </Card>
    );
  }
}

export default RouteTile;
