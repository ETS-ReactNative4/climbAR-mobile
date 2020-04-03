import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import {View, Text} from 'react-native';
import ClimbingRoutes from './ClimbingRoutes';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import {toggleFilterDrawer} from '../redux/actions.js';
import RouteFilters from './RouteFilters';

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
        style={{backgroundColor: '#f0eae3'}}
        content={
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
              }}>
              <Text style={{flex: 7, fontSize: 18, paddingLeft: 20}}>
                Filters
              </Text>
              <Icon
                style={{width: 30, flex: 1}}
                type="FontAwesome"
                name="close"
                onPress={this.props.toggleFilterDrawer}
              />
            </View>
            <RouteFilters />
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
