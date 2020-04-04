// import 'aframe';
// import {Entity, Scene} from 'aframe-react';
import React from 'react';
import {connect} from 'react-redux';
import {fetchSingleClimbingRoute} from '../redux/thunks/climbingRoutesThunks';
import {Text, Image, TextInput} from 'react-native';
// import ReactDOM from 'react-dom';

class RouteModel extends React.Component {
  componentDidMount() {
    const climbingRouteId = this.props.route.params.climbingRouteId;
    this.props.fetchSingleClimbingRoute(climbingRouteId);
  }
  render() {
    console.log('route model',this.props); 
    return <Scene></Scene>;
  }
}

const mapState = ({climbingRoute}) => ({climbingRoute});

const mapDispatch = dispatch => {
  return {
    fetchSingleClimbingRoute: id => dispatch(fetchSingleClimbingRoute(id)),
  };
};

export default connect(mapState, mapDispatch)(RouteModel);
