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
      <div>
        <Link to="/newVehicle">
          <button className="btn btn-primary btn-circle btn-xl glyphicon glyphicon-plus">
            +
          </button>
        </Link>
        <div className="row">
          {this.state.vehicles === null && <p>Loading vehicles...</p>}
          {this.state.vehicles &&
            this.state.vehicles.map(vehicle => (
              <div key={vehicle._id} className="col-sm-3">
                <div className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{vehicle.name}</h5>
                    <p className="card-text">{vehicle.type}</p>
                    <Link to={`/vehicles/${vehicle._id}`}>
                      <button className="btn btn-primary">More info</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Vehicles;
