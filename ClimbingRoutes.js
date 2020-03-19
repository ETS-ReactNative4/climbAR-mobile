import React, {Component} from 'react';
import axios from 'axios';
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
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>hello routes</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default climbingRoutes;
