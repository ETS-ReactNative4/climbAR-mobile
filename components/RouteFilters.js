import React, {Component} from 'react';
import {
  Form,
  Item,
  Picker,
  Icon,
  Text,
  CheckBox,
  Body,
  ListItem,
} from 'native-base';

import {dispatchRouteFilters} from '../redux/thunks/climbingRoutesThunks';
import {connect} from 'react-redux';

class RouteFilters extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(name, value) {
    const {dispatchRouteFilters, routeFilters} = this.props;
    if (name === 'liked' || name === 'completed') {
      dispatchRouteFilters({[name]: !!!routeFilters[name]});
    } else {
      dispatchRouteFilters({[name]: value});
    }
  }
  render() {
    const {
      handleInput,
      props: {routeFilters},
    } = this;
    console.log('completed ', routeFilters.completed === true);
    return (
      <Form style={{flex: 9, flexDirection: 'column'}}>
        <Item picker style={{flexDirection: 'row'}}>
          <Text style={{flex: 1, paddingLeft: 20}}>Grade</Text>
          <Picker
            name="grade"
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Select a Grade"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={routeFilters.grade || ''}
            onValueChange={value => handleInput('grade', value)}>
            <Picker.Item label="All" value="" />
            <Picker.Item label="VB" value="VB" />
            {Array.from({length: 17}).map((_e, i) => (
              <Picker.Item label={`V${i}`} value={`V${i}`} />
            ))}
          </Picker>
        </Item>
        <Item picker style={{flexDirection: 'row'}}>
          <Text style={{flex: 1, paddingLeft: 20}}>Color</Text>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Select a Color"
            placeholderStyle={{color: '#bfc6ea'}}
            placeholderIconColor="#007aff"
            selectedValue={routeFilters.holdColor || ''}
            onValueChange={value => handleInput('holdColor', value)}>
            <Picker.Item label="All" value="" />
            <Picker.Item label="Red" value="Red" />
            <Picker.Item label="Orange" value="Orange" />
            <Picker.Item label="Yellow" value="Yellow" />
            <Picker.Item label="Green" value="Green" />
            <Picker.Item label="Blue" value="Blue" />
            <Picker.Item label="Purple" value="Purple" />
            <Picker.Item label="Black" value="Black" />
            <Picker.Item label="White" value="White" />
          </Picker>
        </Item>
        <ListItem
          picker
          style={{
            flexDirection: 'row',
            height: 50,
          }}>
          <Body>
            <Text>Completed</Text>
          </Body>
          <CheckBox
            name="completed"
            checked={routeFilters.completed}
            onPress={() => handleInput('completed', null)}
          />
        </ListItem>
        <ListItem
          name=""
          picker
          style={{
            flexDirection: 'row',
            height: 50,
          }}>
          <Body>
            <Text>Liked</Text>
          </Body>
          <CheckBox
            name="liked"
            checked={routeFilters.liked}
            onPress={() => handleInput('liked', null)}
          />
        </ListItem>
      </Form>
    );
  }
}

const mapState = ({routeFilters}) => ({routeFilters});
const mapDispatch = dispatch => {
  return {
    dispatchRouteFilters: filters => dispatch(dispatchRouteFilters(filters)),
  };
};

export default connect(mapState, mapDispatch)(RouteFilters);
