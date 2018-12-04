import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import auth0Client from "../Auth";
import axios from "axios";

class NewVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      name: "",
      type: ""
    };
  }
  // componentDidMount() {
  //   fetch('/')
  //     .then((response) => response.json())
  //     .then((type) => this.setState({
  //       type: type
  //     }),
  // }

  updateType(value) {
    this.setState({
      type: value
    });
  }

  updateName(value) {
    this.setState({
      name: value
    });
  }

  async submit() {
    this.setState({
      disabled: true
    });

    await axios.post(
      "http://localhost:3001/vehicles/",
      {
        name: this.state.name,
        type: this.state.type
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );

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
                  <label htmlFor="exampleInputEmail1">Vehicle name:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={e => {
                      this.updateName(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Give your vehicle a name."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">type:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={e => {
                      this.updateType(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Give more context to your question."
                  />
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
