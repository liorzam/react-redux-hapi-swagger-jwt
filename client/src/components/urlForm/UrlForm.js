import React, { Component } from 'react';
import { connect } from "react-redux";
import { addNewUrl, getUrls } from "../../store/actions/urlsActions.js";
import { withRouter } from "react-router-dom";
import style from "./urls.module.scss";
import MUIDataTable from "mui-datatables";
import ReactPlayer from 'react-player'

class UrlForm extends Component {

  constructor(props) {
    super(props);

    props.getUrls();
  }

  state = {
    url: null,
    data: null,
  }

  handleChange = (e) => {
    this.setState({ url: e.target.value });
  }

  handleAddingNewUrl = (e) => {
    e.preventDefault();
    const { addNewUrl } = this.props;
    const { url } = this.state;

    addNewUrl({ url })
    this.setState({ url: null })
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props)
    if (!props.isAuthenticated) {
      props.history.push('/login')
    }

    return null;
  }

  render() {
    console.log(this.props.urls);
    const columns = ["url"];


    const { data } = this.props.urls;
    return (
      <div>
        <div className={`${style["urls-component"]}`}>
        <ReactPlayer url={this.state.rstpUrl} playing style={!this.state.rstpUrl && {display: "none"}}/>
          <form>
            <input name="url" placeholder="RTSP Url" type="string" value={this.state.url} onBlur={this.handleChange} />
            <button onClick={this.handleAddingNewUrl} className="btn-add-url">Add New Url</button>
          </form>
        </div>
        <div>
          <MUIDataTable
            title={"Urls"}
            data={data}
            columns={columns}
            options={ 
              {
                customSort: function (a,b){
                  return b.timestampCreatedAt - a.timestampCreatedAt;
                },
                onCellClick: (function (data) {
                  this.setState({rstpUrl: data});
                }).bind(this)
              }
          }
          />
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
