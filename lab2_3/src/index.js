import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import inventory from "./inventory.ES6";
import ComposeSalad from "./ComposeSalad";
import {Salad} from './salad.js';
import SaladList from './saladList'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {salads: [], selectedSalad:new Salad()}
  }

  updateSalad = (thatSalad) => {
    this.setState((state) => (
      {selectedSalad:thatSalad, salads:[...state.salads.filter(salad => salad !== thatSalad)]}
    ));
  }

  returnSalad = (thatSalad) => {
    this.setState((state) => (
      {selectedSalad:new Salad(), salads:[...state.salads.filter(salad => salad !== this.state.selectedSalad), thatSalad]}
    ));
  }

  removeSalad = (thatSalad) => {
    this.setState((state) => (
      {salads:[...state.salads.filter(salad => salad !== thatSalad)],selectedSalad:new Salad()}
    ));
  }

  render() {
    const aSaladList = (props) => (
      <>
        <SaladList {...props} salads={this.state.salads} selectSalad={this.updateSalad} removeSalad={this.removeSalad}/>
        <span>Total cost: {this.state.salads.reduce((cost, salad) =>cost+salad.price(), 0)}</span>
      </>
    );
    const aComposeSalad = (props) =><ComposeSalad {...props} inventory={inventory} salad={this.state.selectedSalad} returnSalad={this.returnSalad} createSalad={()=>this.updateSalad(new Salad())} setSalad={this.updateSalad}/>
    return (
      <Router>
        <div>
          <div className="jumbotron text-center">
            <h1 className="display-4">EDAF90 - Web Programming</h1>
            <p className="lead">
              This is a template project for react + router + bootstrap.
            </p>
            <hr className="my-4" />
            <p>This code is a good starting point for lab 2.</p>
          </div>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to="compose-salad">
                Komponera din egen sallad!
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="list-salad">
                Visa beställning
              </Link>
            </li>
          </ul>
          <section className="mainContent">
            <Route path="/list-salad" render={aSaladList}/>
            <Route path="/compose-salad" render={aComposeSalad} />
          </section>
        </div>
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
