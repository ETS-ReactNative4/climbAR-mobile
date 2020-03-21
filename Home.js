import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';
import {Button} from 'react-native-material-ui';
import Topnav from './Topnav';

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView>
        <Topnav />
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Our Code</Text>
            <Text style={styles.sectionTitle}>*****************</Text>
            <Button
              raised
              primary
              onPress={() => {
                alert('You tapped the button!');
                axios
                  .get('https://climbar.herokuapp.com/api/climbingroutes')
                  .then(res => {
                    alert(JSON.stringify(res.data));
                  })
                  .catch(e => {
                    alert(e);
                  });
              }}
              text="Press Me For Some Data"
            />
            <Text id="demo" />
          </View>
        </View>
        <View style={styles.logoContainer}>
          <Text> Connect Collaborate & Create Amazing Climbing Routes </Text>
          <Image
            style={{width: 350, height: 85}}
            source={require('./public/logo.png')}
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
