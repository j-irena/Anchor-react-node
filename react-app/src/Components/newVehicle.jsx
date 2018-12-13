import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import auth0Client from "../Auth";
import axios from "axios";

class NewVehicle extends Component {
  state = {
    disabled: false,
    name: "",
    type: []
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

  async submit() {
    if (!this.state.name || this.state.type.length < 1) {
      alert("Please insert vehicle name and type");
      return;
    }
    this.setState({
      disabled: true
    });

    await axios
      .post(
        "http://localhost:3001/vehicles/",
        {
          name: this.state.name,
          type: this.state.type
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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Vehicle</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={this.updateName}
                    className="form-control"
                    placeholder="Give your vehicle a name"
                  />
                </div>
                <div className="form-group">
                  {/* To do: Get types dynamically from the backend */}
                  <label>Type:</label>
                  <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    onChange={this.updateType}
                    value={this.state.type}
                  >
                    <option>Choose...</option>
                    <option value="SUV">SUV</option>
                    <option value="Truck">Truck</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Convertible">Convertible</option>
                  </select>
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {
                    this.submit();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NewVehicle);
