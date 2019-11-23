import React, {Component} from 'react';
import {connect} from "react-redux";
import {signUp} from "../../store/actions/registerActions";
import {withRouter} from "react-router-dom";
import style from "./register.module.scss";

class RegistrationForm extends Component {

  state = {
    email: null,
    password: null,
    firstName: null,
    lastName: null,
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const {signUp} = this.props;
    const {email, password, firstName, lastName} = this.state;

    signUp({email, password, firstName, lastName})
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isAuthenticated) {
      props.history.push('/urls')
    }
    return null;
  }

  render() {
    const {} = this.props;
    console.log(style);
    return (
      <div className={`${style["register"]}`}>
        <form>
          <input name="email" placeholder="email" type="email" onChange={this.handleChange} />
          <input name="password" placeholder="password" type="password" onChange={this.handleChange}  />
          <input name="firstName" placeholder="First Name" type="string" onChange={this.handleChange} />
          <input name="lastName" placeholder="Last Name" type="string" onChange={this.handleChange} />
          <button onClick={this.handleSignUp} className="btn-register">Sign Up</button>
        </form>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: data => dispatch(signUp(data))
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm));
