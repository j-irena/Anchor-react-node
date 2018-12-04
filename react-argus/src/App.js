import React, { Component } from "react";
import NavBar from "./Components/navbar";
import Vehicles from "./Components/vehicles";
import Vehicle from "./Components/vehicle";
import Callback from "./Callback";
import SecuredRoute from "./Components/SecuredRoute";
import { Route, withRouter } from "react-router-dom";
import auth0Client from "./Auth";
import newVehicle from "./Components/newVehicle";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true
    };
  }

  async componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === "login_required") return;
      console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }

  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={Vehicles} />
        <Route exact path="/vehicles/:_id" component={Vehicle} />
        <Route exact path="/callback" component={Callback} />
        <SecuredRoute path="/newVehicle" component={newVehicle} />
      </div>
    );
  }
}

export default withRouter(App);
