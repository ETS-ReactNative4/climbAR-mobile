import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar, TouchCapacity} from 'react-native';
import Navigator from './Routes';
import {connect} from 'react-redux';

class Main extends Component {
  render() {
    return <Navigator />;
  }
}

export default connect(null, null)(Main);
