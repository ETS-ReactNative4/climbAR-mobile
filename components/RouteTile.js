import React, {Component} from 'react';
import LikeButton from './LikeButton';
import CompleteButton from './CompleteButton';
import RatingButton from './RatingButton';
import RatingDisplay from './RatingDisplay';
import {average} from '../utils';
import {Card, CardItem, Button, Text} from 'native-base';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {withNavigation} from 'react-navigation';

class RouteTile extends Component {
  constructor() {
    super();
  }
  pressHandler = id => {
    console.log(id);
    console.log('this is the props', this.props);
  };
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
    //to do: add single route view link to grade
    //to do: add rating button to the card or to the single route page
    return (
      <Card>
        <Button
          block
          style={{
            backgroundColor: route.holdColor,
          }}
          onPress={() => this.pressHandler(route.id)}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            {route.grade}
          </Text>
        </Button>
        <CardItem style={{backgroundColor: '#f0eae3'}}>
          <LikeButton route={route} />
          <CompleteButton route={route} />
          <RatingDisplay avgRating={avgRating} />
          <Text style={{paddingLeft: 5}}>Difficulty</Text>
        </CardItem>
        <CardItem
          style={{justifyContent: 'center', backgroundColor: '#f0eae3'}}>
          <Text>Expiring {daysToExpire()} </Text>
        </CardItem>
        <CardItem style={{backgroundColor: '#f0eae3'}}>
          {user.userType && <RatingButton route={route} />}
        </CardItem>
      </Card>
    );
  }
}

export default withNavigation(RouteTile);
