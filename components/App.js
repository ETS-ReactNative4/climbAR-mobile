/* eslint-disable no-alert */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import axios from 'axios';
import {Provider} from 'react-redux';
import store from '../store';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Button} from 'react-native-material-ui';

import Topnav from './Topnav';
import ClimbingRoutes from './ClimbingRoutes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <Topnav />
              <View style={styles.body}>
                <ClimbingRoutes />
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
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Boilerplate Code</Text>
                  <Text style={styles.sectionTitle}>*****************</Text>
                  <Text style={styles.sectionTitle}>See Your Changes</Text>
                  <Text style={styles.sectionDescription}>
                    <ReloadInstructions />
                  </Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Debug</Text>
                  <Text style={styles.sectionDescription}>
                    <DebugInstructions />
                  </Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Learn More</Text>
                  <Text style={styles.sectionDescription}>
                    Read the docs to discover what to do next:
                  </Text>
                </View>
                <LearnMoreLinks />
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
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

export default App;
