import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";

class Vehicle extends Component {
  state = { vehicles: this.props.vehicles };

  async componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const vehicle = await axios.get(
      `http://localhost:3001/vehicles/${params._id}`
    );
    this.setState({ vehicle });
  }

  render() {
    const { vehicle } = this.state;
    if (vehicle === null || vehicle === undefined) return <p>Loading...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{vehicle.data.name}</h1>
            <p className="lead">{vehicle.data.type}</p>
            <hr className="my-4" />
            <p>
              Creation date: <span> </span>
              <Moment format="DD/MM/YYYY HH:mm:ss">
                {vehicle.data.created_at}
              </Moment>
            </p>
            <p>
              Last updated: <span> </span>
              <Moment format="DD/MM/YYYY HH:mm:ss">
                {vehicle.data.last_successful_update}
              </Moment>
            </p>
            <p className="lead">
              <button
                //onClick={() => this.props.onIncrement(this.props.counter)}
                className="btn btn-primary btn-sm"
              >
                Edit
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Vehicle;
