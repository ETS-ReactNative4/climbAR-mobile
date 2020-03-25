import React from 'react';
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

import {
  Container,
  Header,
  Body,
  Text,
  Icon,
  Left,
  Right,
  Title,
  Button,
} from 'native-base';

const TopNav = ({scene, previous, navigation}) => {
  // const {options} = scene.descriptor;
  // const title =
  //   options.headerTitle !== undefined
  //     ? options.headerTitle
  //     : options.title !== undefined
  //     ? options.title
  //     : scene.route.name;
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
            <Text>previous</Text>
          </Button>
        </Left>
        <Body>
          <Title>Title</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
    </Container>
  );
};

export default TopNav;
