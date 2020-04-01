import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Text, Button} from 'native-base';
import axios from 'axios';
import ClimbingRoutes from './ClimbingRoutes';
import {removeUserToken} from '../redux/thunks/userThunks';

class Home extends Component {
  allClimbingRoutes = () => {
    this.props.navigation.navigate('ClimbingRoutes');
  };
  logOutAsync = () => {
    this.props
      .removeUserToken()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => this.setState({error}));
  };

  render() {
    return (
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={this.allClimbingRoutes}>
            <Text> Cllimbing Routes </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Button primary onPress={this.logOutAsync()}>
            <Text>I'm done, log me out.</Text>
          </Button>
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

const mapState = ({token}) => ({token});

const mapDispatch = dispatch => {
  return {
    removeUserToken: () => dispatch(removeUserToken()),
  };
};

export default connect(mapState, mapDispatch)(Home);
