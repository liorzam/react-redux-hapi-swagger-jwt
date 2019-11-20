import React, {Component} from 'react';
import style from "./registration.module.scss"
import { setEmailInput } from "../actions/registerActions";
import {connect} from "react-redux";

// function RegistratoinForm({ setEmailInput }) {

//   const onChangeHandler = ({value}) => {
//     setEmailInput(value);
//   }

  // return (
  //   <div>
  //     <input onChange={onChangeHandler}></input>
  //   </div>
  // );
// }

class RegistratoinForm extends Component {
  
  state = {
    email: null,
    password: null,
    firstName: null,
    lastName: null,
  }
  
  onChangeHandler = ({value}) => {
        setEmailInput(value);
  }

    render() {
      return (
        <div>
          <form><
          <input id="email" type="email" onChange={this.onChangeHandler} />
          <input id="password" type="password" onChange={this.onChangeHandler} />
          <input id="firstName" onChange={this.onChangeHandler} />
          <input id="lastName" onChange={this.onChangeHandler} />
          </form>

        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    data: state.currData.data,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setEmailInput: (v) => dispatch(setEmailInput(v))
  };
}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegistratoinForm);