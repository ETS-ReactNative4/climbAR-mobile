import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import {View, Text} from 'react-native';
import ClimbingRoutes from './ClimbingRoutes';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import {toggleFilterDrawer} from '../redux/actions.js';

class FilterDrawer extends Component {
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };
  render() {
    return (
      <Drawer
        open={this.props.filterDrawer.show}
        ref={ref => (this._drawer = ref)}
        content={
          <View>
            <Text>Drawer Content</Text>
            <Icon
              type="FontAwesome"
              name="close"
              onPress={this.props.toggleFilterDrawer}
            />
          </View>
        }>
        <ClimbingRoutes />
      </Drawer>
    );
  }
}

const mapState = ({filterDrawer}) => ({filterDrawer});
const mapDispatch = dispatch => {
  return {
    toggleFilterDrawer: () => dispatch(toggleFilterDrawer()),
  };
};

export default connect(mapState, mapDispatch)(FilterDrawer);
