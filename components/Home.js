import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Text} from 'native-base';
import TopNav from './TopNav';
import axios from 'axios';
import climbingRoutes from './ClimbingRoutes';

export default class Home extends Component {
  allClimbingRoutes = () => {
    this.props.navigation.navigate('ClimbingRoutes');
  };
  render() {
    return (
      <SafeAreaView>
        <View>
          <TopNav />
        </View>
        <View>
          <TouchableOpacity onPress={this.allClimbingRoutes}>
            <Text> Cllimbing Routes </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Text> Connect Collaborate & Create Amazing Climbing Routes </Text>
          <Image
            style={{width: 350, height: 85}}
            source={require('./../public/logo.png')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 300,
  },

  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
