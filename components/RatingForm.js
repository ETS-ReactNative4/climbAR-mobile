import React from 'react';
import {connect} from 'react-redux';
import {rate} from '../redux/thunks/userThunks';
import {Content, Form, Item, Picker, Text, Icon, Button} from 'native-base';

class RatingForm extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: '1',
    };
    this.handleInput = this.handleInput.bind(this);
    this.rated = this.rated.bind(this);
  }
  rated() {
    const {route, user} = this.props;
    const rating = route.ratings.filter((_r) => _r.userId === user.id)[0];
    return rating
      ? `You rated this route ${rating.rating}. Change your rating?`
      : `You haven't rated this route`;
  }
  handleInput(name, value) {
    this.setState({[name]: value});
  }
  render() {
    const {
      props: {route, user, rate},
      state: {rating},
      handleInput,
    } = this;
    return (
      <Content>
        <Text>{this.rated()}</Text>
        <Text>How hard was this compared to other {route.grade} routes?</Text>
        <Form style={{flex: 9, flexDirection: 'column'}}>
          <Item picker style={{flexDirection: 'row'}}>
            <Picker
              name="rating"
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder=""
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="#007aff"
              selectedValue={this.state.rating || ''}
              onValueChange={(value) => handleInput('rating', value)}>
              <Picker.Item label="1 - Like climbing a later" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item
                label={`5 - Normal for a ${route.grade}`}
                value="5"
              />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10 - Impossible" value="10" />
            </Picker>
          </Item>
        </Form>
        <Button
          onPress={() => {
            rate(user, route, rating);
          }}>
          <Text>Rate It</Text>
        </Button>
      </Content>
    );
  }
}

const mapState = ({user}) => ({user});
const mapDispatch = (dispatch) => {
  return {
    rate: (user, route, rating) => dispatch(rate(user, route, rating)),
  };
};

export default connect(mapState, mapDispatch)(RatingForm);
