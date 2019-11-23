
import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";

class Header extends Component {

  state = {
    user: null,
  }

  renderUserOptions = (isAuthenticated) => {
    if(!isAuthenticated){
      return (
        [<li>
          <Link to="/register">Register</Link>
        </li>,
        <li>
        <Link to="/login">Login</Link>
        </li>
        ]
      );
    }

    return (
      <li>
        <Link to="/urls">Urls</Link>
      </li>
    );
  }

  render() {
    const {isAuthenticated} = this.props;
    
    return (
        <header className="App-header">
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {this.renderUserOptions(isAuthenticated)}
            </ul>
          </nav>
        </div>
        </header>
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
    
  };
}


export default withRouter(connect(mapStateToProps, null)(Header));
