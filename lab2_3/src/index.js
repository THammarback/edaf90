import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import inventory from "./inventory.ES6";
import ComposeSaladModal from "./ComposeSaladModal";
import {Salad} from './salad.js';
import SaladList from './saladList'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {salads: [], selectedSalad:new Salad("Sallad")}
  }

  updateSalad = (thatSalad) => {
    this.setState((state) => (
      {selectedSalad:thatSalad, salads:[...state.salads.filter(salad => salad !== thatSalad)]}
    ));
  }

  returnSalad = (thatSalad) => {
    this.setState((state) => (
      {selectedSalad:new Salad("Sallad"), salads:[...state.salads.filter(salad => salad !== this.state.selectedSalad), thatSalad]}
    ));
  }

  removeSalad = (thatSalad) => {
    this.setState((state) => (
      {salads:[...state.salads.filter(salad => salad !== thatSalad)],selectedSalad:new Salad("Sallad")}
    ));
  }


  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-4">EDAF90 - Web Programming</h1>
          <p className="lead">
            This is a template project for react + router + bootstrap.
          </p>
          <hr className="my-4" />
          <p>This code is a good starting point for lab 2.</p>
        </div>
        <section className="mainContent">
          <SaladList salads={this.state.salads} selectSalad={this.updateSalad} removeSalad={this.removeSalad}/>
          <ComposeSaladModal inventory={inventory} salad={this.state.selectedSalad} returnSalad={this.returnSalad} createSalad={()=>this.updateSalad(new Salad("Sallad"))} setSalad={this.updateSalad}/>
          <span>Total cost: {this.state.salads.reduce((cost, salad) =>cost+salad.price(), 0)}</span>
        </section>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
