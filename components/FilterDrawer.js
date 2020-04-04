import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import {View, Text, StyleSheet} from 'react-native';
import ClimbingRoutes from './ClimbingRoutes';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import {toggleFilterDrawer, closeRatingFormDrawer} from '../redux/actions.js';
import RouteFilters from './RouteFilters';
import RatingForm from './RatingForm';

class FilterDrawer extends Component {
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };
  render() {
    const {filterDrawer, ratingFormDrawer} = this.props;
    return (
      <Drawer
        open={filterDrawer.show || ratingFormDrawer.show}
        ref={(ref) => (this._drawer = ref)}
        style={styles.container}
        content={
          filterDrawer.show ? (
            <View style={styles.DrawerContainer}>
              <View style={styles.DrawerHeader}>
                <Text style={styles.headerText}>Filters</Text>
                <Icon
                  style={styles.closingIcon}
                  type="FontAwesome"
                  name="close"
                  onPress={this.props.toggleFilterDrawer}
                />
              </View>
              <RouteFilters />
            </View>
          ) : ratingFormDrawer.show ? (
            <View style={styles.DrawerContainer}>
              <View style={styles.DrawerHeader}>
                <Text style={styles.headerText}>Rate this Route?</Text>
                <Icon
                  style={styles.closingIcon}
                  type="FontAwesome"
                  name="close"
                  onPress={this.props.closeRatingFormDrawer}
                />
              </View>
              <RatingForm route={ratingFormDrawer.selectedRoute} />
            </View>
          ) : null
        }>
        <ClimbingRoutes />
      </Drawer>
    );
  }
}

const mapState = ({filterDrawer, ratingFormDrawer}) => ({
  filterDrawer,
  ratingFormDrawer,
});
const mapDispatch = (dispatch) => {
  return {
    toggleFilterDrawer: () => dispatch(toggleFilterDrawer()),
    closeRatingFormDrawer: () => dispatch(closeRatingFormDrawer()),
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0eae3',
  },
  DrawerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f0eae3',
  },
  DrawerHeader: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  headerText: {
    flex: 7,
    fontSize: 18,
    paddingLeft: 20,
  },
  closingIcon: {
    width: 30,
    flex: 1,
  },
});

export default connect(mapState, mapDispatch)(FilterDrawer);
