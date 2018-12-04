import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Vehicles extends Component {
  state = { vehicles: null };

  async componentDidMount() {
    const vehicles = (await axios.get("http://localhost:3001/vehicles")).data;
    this.setState({
      vehicles
    });
  }

  render() {
    return (
      <div className="row mt-4">
        <div className="card">
          <div className="card-body">
            <Link to="/newVehicle">
              <h5 className="card-text">+ New Vehicle</h5>{" "}
            </Link>
          </div>
        </div>

        {this.state.vehicles === null && <p>Loading vehicles...</p>}
        {this.state.vehicles &&
          this.state.vehicles.map(vehicle => (
            <div key={vehicle._id} className="mt-4 col-sm-12 col-md-4 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{vehicle.name}</h5>
                  <p className="card-text">Is a {vehicle.type}</p>
                  <Link to={`/vehicles/${vehicle._id}`}>
                    <button className="btn btn-primary">More info</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default Vehicles;