import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
} from 'native-base';

class climbingRoutes extends Component {
  state = {
    routeList: [],
  };

  componentDidMount() {}
  render() {
    const {routeList} = this.state;
    return (
      <Container>
        <Header>
          <Text>All Climbing Routes</Text>
        </Header>
        <Content>
          {routeList.map(route => {
            <Card>
              <CardItem>
                <Text>{route.grade}</Text>
              </CardItem>
            </Card>;
          })}
        </Content>
      </Container>
    );
  }
}

export default climbingRoutes;
