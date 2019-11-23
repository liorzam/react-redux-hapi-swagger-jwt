import React, {Component} from 'react';
import {connect} from "react-redux";
import {addNewUrl} from "../../store/actions/urlsActions.js";
import {withRouter} from "react-router-dom";
import style from "./urls.module.scss";

class UrlForm extends Component {

  state = {
    url: null,
  }

  handleChange = (e) => {
    this.setState({url: e.target.value});
  }

  handleAddingNewUrl = (e) => {
    e.preventDefault();
    const {addNewUrl} = this.props;
    const {url} = this.state;

    console.log(url);
    addNewUrl({url})
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.isAuthenticated) {
      props.history.push('/login')
    }
    return null;
  }

  render() {
    const {} = this.props;
    return (
      <div className={`${style["urls-component"]}`}>
        <form>
          <input name="url" placeholder="RTSP Url" type="string" onChange={this.handleChange} />
          <button onClick={this.handleAddingNewUrl} className="btn-add-url">Add New Url</button>
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
    addNewUrl: data => dispatch(addNewUrl(data))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UrlForm));
