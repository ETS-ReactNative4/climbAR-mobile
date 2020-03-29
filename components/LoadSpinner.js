import React, {Component} from 'react';
import {Container, Header, Content, Spinner} from 'native-base';
export default class LoadSpinner extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Spinner />
        </Content>
      </Container>
    );
  }
}
