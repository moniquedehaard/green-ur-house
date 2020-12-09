// Packages
import React from "react";
import { Switch, Route } from "react-router-dom";
//Routes
import NormalRoute from "./routing-components/NormalRoute";
import ProtectedRoute from "./routing-components/ProtectedRoute";
import { getLoggedIn, logout } from "./services/auth";
import * as PATHS from "./utils/paths";
// Components
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
// Pages
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import ProtectedPage from "./pages/ProtectedPage";
import Signup from "./pages/Signup";
import PlantPage from "./pages/PlantPage"
import PlantProductPage from "./pages/PlantProductPage";


class App extends React.Component {
  state = {
    user: null,
    isLoading: true,
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return this.setState({
        isLoading: false,
      });
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        console.log("RES IN CASE OF FAILURE", res);
        // deal with failed backend call
        return this.setState({
          isLoading: false,
        });
      }
      this.setState({
        user: res.data.user,
        isLoading: false,
      });
    });
  };

  handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return this.setState({
        user: null,
        isLoading: false,
      });
    }
    this.setState(
      {
        isLoading: true,
      },
      () => {
        logout(accessToken).then((res) => {
          if (!res.status) {
            // deal with error here
            console.log("SOMETHING HAPPENED", res);
          }

          localStorage.removeItem("accessToken");
          return this.setState({
            isLoading: false,
            user: null,
          });
        });
      }
    );
  };

  authenticate = (user) => {
    this.setState({
      user,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingComponent />;
    }

    return (
      <div className="App">
        <Navbar handleLogout={this.handleLogout} user={this.state.user} />
        <Switch>
          <NormalRoute exact path='/' component={HomePage} />
          <Route exact path='/plants' component={PlantPage} />
          <Route exact path='/plants/:id' component={PlantProductPage} />
          <NormalRoute
            exact
            path='/auth/signup'
            authenticate={this.authenticate}
            component={Signup}
          />
          <NormalRoute
            exact
            path="/auth/login"
            authenticate={this.authenticate}
            component={LogIn}
          />
          <ProtectedRoute
            exact
            path="/protected"
            component={ProtectedPage}
            user={this.state.user}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
