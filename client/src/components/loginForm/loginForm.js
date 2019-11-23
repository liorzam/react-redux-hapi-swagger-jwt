import React, {Component} from 'react';
import {connect} from "react-redux";
import {login} from "../../store/actions/loginActions";
import {withRouter} from "react-router-dom";
import style from './login.module.scss'

class LoginForm extends Component {

  state = {
    email: null,
    password: null,
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleLogin = (e) => {
    e.preventDefault();
    const {login} = this.props;
    const {email, password} = this.state;

    login({email, password})
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isAuthenticated) {
      props.history.push('/urls')
    }
    return null;
  }

  render() {
    const {} = this.props;
    return (
    <div className={`${style["register"]}`}>
        <form>
        <input name="email" placeholder="email" type="email" onChange={this.handleChange} />
        <input name="password" placeholder="password" type="password" onChange={this.handleChange}  />
        <button onClick={this.handleLogin} className="btn-login-submit">Log In</button>
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
    login: data => dispatch(login(data))
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
