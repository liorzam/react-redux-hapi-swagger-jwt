import React, {Component} from 'react';
import {connect} from "react-redux";
import {addNewUrl, getUrls} from "../../store/actions/urlsActions.js";
import {withRouter} from "react-router-dom";
import style from "./urls.module.scss";

class UrlForm extends Component {

  constructor(props) {
    super(props);
  }

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

    addNewUrl({url})
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props)
    if (!props.isAuthenticated) {
      props.history.push('/login')
    } else {
      // props.getUrls();
    }
    return null;
  }

  render() {
    const {} = this.props;
    return (
      <div>
        <div className={`${style["urls-component"]}`}>
          <form>
            <input name="url" placeholder="RTSP Url" type="string" onChange={this.handleChange} />
            <button onClick={this.handleAddingNewUrl} className="btn-add-url">Add New Url</button>
          </form>
        </div>
        <div>
          
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    urls: state.urls,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNewUrl: (data) => dispatch(addNewUrl(data)),
    getUrls: () => dispatch(getUrls())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UrlForm));
