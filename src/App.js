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

/// PAGES
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import ProtectedPage from "./pages/ProtectedPage";
import Signup from "./pages/Signup";
// Plants
import PlantPage from "./pages/Plants/PlantPage"
import PlantProductPage from "./pages/Plants/PlantProductPage"
// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";
import D_PlantPage from "./pages/Dashboard/D_PlantPage";
import D_FavoritePlants from "./pages/Dashboard/D_FavoritePlant";
import D_Account from "./pages/Dashboard/D_Account";
import CreateFormPlants from "./pages/Form/CreateFormPlants";


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
    // If there is an user
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

  handleStateUser = (updatedUser) => {
    this.setState({
      user: updatedUser
    })
  }

  render() {
    if (this.state.isLoading) {
      return < LoadingComponent />;
    }
    console.log('User from app.js', this.state.user)

    return (
      <div className="App">
        <Navbar handleLogout={this.handleLogout} user={this.state.user} />
        {/* <Header> */}
        <Switch>
          <NormalRoute exact path='/' component={HomePage} />

          {/* Plantpages */}
          <Route
            exact
            path='/plants'
            render={RouterProps => <PlantPage {...RouterProps} user={this.state.user} />}
          />
          <Route
            exact
            path='/plants/:id'
            render={RouterProps => <PlantProductPage {...RouterProps} user={this.state.user} handleUser={this.handleStateUser}/>}
          />

          {/* Form about plants */}
          <ProtectedRoute
            exact
            path='/your-plants/create'
            component={CreateFormPlants}
            user={this.state.user}
          />
        
   
          {/* Dashboard */}
          <ProtectedRoute
            exact
            path='/dashboard'
            component={Dashboard} 
            user={this.state.user}
          /> 
          <ProtectedRoute
            exact
            path='/dashboard/your-plants'
            component={D_PlantPage} 
            user={this.state.user}
          /> 
          <ProtectedRoute
            exact
            path='/dashboard/favorite-plants'
            component={D_FavoritePlants} 
            user={this.state.user}
          /> 
          <ProtectedRoute
            exact
            path='/dashboard/account'
            component={D_Account}
            user={this.state.user}
          /> 

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
