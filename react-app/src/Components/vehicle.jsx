import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import auth0Client from "../Auth";

class Vehicle extends Component {
  state = {
    vehicle: null,
    isEditing: false,
    name: null,
    type: null,
    disable: false
  };

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  updateType = event => {
    this.setState({
      type: event.target.value
    });
  };

  updateName = event => {
    this.setState({
      name: event.target.value
    });
  };

  disableButton() {
    this.setState({
      disabled: true
    });
  }

  async componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const vehicle = await axios
      .get(`http://localhost:3001/vehicles/${params._id}`)
      .catch(error => {
        console.log(error.response);
      });
    this.setState({
      vehicle: vehicle,
      name: vehicle.data.name,
      type: vehicle.data.type
    });
  }

  async submitEdit() {
    let newName = this.state.name;
    let newType = this.state.type;
    let newUpdateTime = Math.round(new Date().getTime());

    if (!newName || newType.length < 1) {
      alert("Please insert vehicle name and type");
      return;
    }
    this.disableButton();

    const {
      match: { params }
    } = this.props;
    await axios
      .put(
        `http://localhost:3001/vehicles/${params._id}`,
        {
          name: newName,
          type: newType,
          last_successful_update: newUpdateTime
        },
        {
          headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
        }
      )
      .catch(error => {
        console.log(error.response);
      });

    this.props.history.push("/");
  }

  async onDelete() {
    this.disableButton();
    const {
      match: { params }
    } = this.props;
    await axios
      .delete(`http://localhost:3001/vehicles/${params._id}`, {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      })
      .catch(error => {
        console.log(error.response);
      });

    this.props.history.push("/");
  }

  render() {
    const { vehicle, type } = this.state;
    if (vehicle === null || vehicle === undefined)
      return <p className="ml-2">Loading...</p>;
    if (this.state.isEditing) {
      return (
        <div className="container">
          <div className="row">
            <div className="jumbotron col-12">
              <h1 className="display-4">Edit Vehicle</h1>
              <div>
                <label htmlFor="Name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter name"
                  defaultValue={vehicle.data.name}
                  onChange={this.updateName}
                />
              </div>
              <div>
                {/* To do: Get types dynamically from the backend */}
                <label htmlFor="Type" className="mt-3">
                  Type:
                </label>
                <select
                  className="custom-select"
                  name="Type"
                  id="inputGroupSelect01"
                  onChange={this.updateType}
                  value={type}
                >
                  <option>Choose...</option>
                  <option value="SUV">SUV</option>
                  <option value="Truck">Truck</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Convertible">Convertible</option>
                </select>
              </div>
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
                  disabled={this.state.disabled}
                  className="btn btn-primary mr-2"
                  onClick={() => {
                    this.submitEdit();
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => this.toggleEdit(true)}
                  className="btn btn-secondary"
                >
                  Discard
                </button>
              </p>
            </div>
          </div>
        </div>
      );
    }
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
                onClick={() => this.toggleEdit(true)}
                className="btn btn-primary mr-2"
              >
                Edit
              </button>
              <button
                disabled={this.state.disabled}
                onClick={() => this.onDelete()}
                className="btn btn-danger"
              >
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Vehicle;
