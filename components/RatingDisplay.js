import React from 'react';
import {View} from 'react-native';

const RatingDisplay = ({avgRating}) => {
  if (avgRating < 5) {
    return (
      <View
        style={{
          width: 80,
          height: 25,
          borderColor: 'black',
          borderWidth: 1,
          backgroundColor: '#5cb85c',
          position: 'relative',
          display: 'flex',
          justifyContent: 'flex-end',
        }}></View>
    );
  } else if (avgRating > 4 && avgRating < 8) {
    return (
      <View
        style={{
          width: 80,
          height: 25,
          borderColor: 'black',
          borderWidth: 1,
          backgroundColor: '#f0ad4e',
          position: 'relative',
          display: 'flex',
          justifyContent: 'flex-end',
        }}></View>
    );
  } else {
    return (
      <View
        style={{
          width: 80,
          height: 25,
          borderColor: 'black',
          borderWidth: 1,
          backgroundColor: '#d9534f',
          position: 'relative',
          display: 'flex',
          justifyContent: 'flex-end',
        }}></View>
    );
  }
};

export default RatingDisplay;
