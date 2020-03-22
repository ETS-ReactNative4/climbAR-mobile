import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {rate} from '../redux/thunks/UserThunks';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    const rating = route.ratings.filter(_r => _r.userId === user.id)[0];
    return rating
      ? `You rated this route ${rating.rating}. Change your rating?`
      : `You haven't rated this route`;
  }
  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    const {
      props: {route, user, rate},
      state: {rating},
      handleInput,
    } = this;
    return (
      <div>
        <div>{this.rated()}</div>
        <br />
        <div>How hard was this compared to other {route.grade} routes?</div>
        <Form.Control
          value={this.state.rating}
          as="select"
          id="rating"
          name="rating"
          type="select"
          onChange={handleInput}
          style={{marginTop: '10px', marginBottom: '10px'}}>
          <option value="1">1 - Like climbing a later</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5 - Normal for a {route.grade}</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10 - Impossible</option>
        </Form.Control>
        <Button
          onClick={() => {
            rate(user, route, rating);
          }}
          variant="dark">
          Rate It
        </Button>
      </div>
    );
  }
}

const mapState = ({user}) => ({user});
const mapDispatch = dispatch => {
  return {
    rate: (user, route, rating) => dispatch(rate(user, route, rating)),
  };
};

export default connect(mapState, mapDispatch)(RatingForm);
