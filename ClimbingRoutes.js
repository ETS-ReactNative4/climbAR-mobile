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
  state = {
    routeList: [],
  };

  componentDidMount() {
    axios
      .get('https://climbar.herokuapp.com/api/climbingroutes')
      .then(res => res.data)
      .then(data => {
        // console.log(data);
        this.setState({routeList: data});
      })
      .catch(err => console.log(err));
  }
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
