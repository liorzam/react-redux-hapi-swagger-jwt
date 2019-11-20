import React, { Component } from "react";
import style from "./App.module.scss";
import PageLayout from "./components/pageLayout";
import RegistrationForm from "./components/registrationForm";
import { Button, Input } from "antd";
import {connect} from "react-redux";


const { Search } = Input;

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  
  handleDoSomething = e => {
    console.log(e.target);
  };

  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div className={style["App"]}>
        <PageLayout>
          <header className="App-header">
            <div className="add-new-item-wrapper">
              <Button
                type="primary"
                onClick={this.handleDoSomething}
                size="large"
              >
                Do something
              </Button>
              <div className="search-item-wrapper">
                <Search
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                />
              </div>
            </div>
          </header>
          <div className="main-page-content">
            <nav></nav>
            <RegistrationForm />
            <article></article>
          </div>
        </PageLayout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.currData.data,
  };
};

export default  connect(
    mapStateToProps,
  )(App);

