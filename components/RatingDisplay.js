import React from 'react';
import {View} from 'react-native';
import {Container, Body} from 'native-base';

const RatingDisplay = ({avgRating}) => {
  return (
    <View
      style={{
        width: 100,
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'green',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          height: '100%',
          width: `${100 - (avgRating / 10) * 100}%`,
          backgroundColor: 'white',
          postion: 'absolute',
        }}></View>
    </View>
  );
};

export default RatingDisplay;
