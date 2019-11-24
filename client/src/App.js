import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import style from "./App.module.scss";
import PageLayout from "./components/pageLayout";
import { Button, Input } from "antd";
import {connect} from "react-redux";
import UrlForm from "./components/urlForm";
import RegistrationForm from "./components/registrationForm";
import LoginForm from "./components/loginForm";
import Header from "./components/headerComponent";
import { setToken } from "./api";

class App extends Component {

  constructor(props) {
    super(props);
    const {auth} = props;
    if(auth && auth.token){
      setToken(auth.token);
    }
  }

  renderUserName() {
    let name = (this.props.user && this.props.user.firstName) || 'Guest';
    
    return (
      <p>Hello, {name}</p>
    )
    return null;
  }

  render() {
    
    console.log(this.props);
    console.log(this.state);

    return (
      <Router>
        <div className={style["App"]}>
          <PageLayout>
            <Header/>
            <div className="main-page-content">
              <Switch>
              <Route path="/register">
                  <RegistrationForm />
                </Route>
                <Route path="/login">
                  <LoginForm />
                </Route>
                <Route path="/urls">
                  <UrlForm />
                </Route>
                <Route path="/">
                  {this.renderUserName()}
                </Route>
              </Switch>
            </div>
          </PageLayout>
        </div>


      </Router>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.auth,
  };
};

export default  connect(
    mapStateToProps,
  {}  )(App);

