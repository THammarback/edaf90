import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery"; // skip this if you do not use bootstrap modals
import Popper from "popper.js"; // skip this if you do not use bootstrap modal'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import inventory from "./inventory.ES6";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Salad from "./Salad"
import ResubmitSalad from "./ResubmitSalad";


class App extends Component {
  state = {order:[], inventory:{}, stateSalad: new Salad()}
  count = 1;


  addSalad = item =>{
    let mySalad = new Salad();
    mySalad = item;
    mySalad.id = parseInt(this.count);
    this.count = this.count + parseInt(1);
    this.addOrder(mySalad);
  }

  addOrder = item => {
    const newOrder = this.state.order.filter(salad => item.id !== salad.id);
    this.state.order = newOrder;
    const salads = [...this.state.order, item];
    this.setState({order: salads});
  }

  deleteSalad = item => {
   let index = this.state.order.indexOf(item);
    this.setState(this.state.order.splice(index, 1));
  }

  changeSalad = item => {
    this.state.stateSalad = item;
    this.setState({stateSalad: item});
    console.log(this.state.stateSalad);
  }
  
  render() {
    const composeSaladElem = (params) => 
    <ComposeSalad {...params} 
    inventory={inventory} 
    addSalad={this.addSalad}
    />;

    const resubmitSaladElem = (params) => 
      <ResubmitSalad {...params}
      inventory = {inventory}
      addOrder ={this.addOrder}
      mySalad = {this.state.stateSalad}
      />;

    const viewOrderElem = (params) => 
    <ViewOrder {...params} 
    order = {this.state.order}
    deleteSalad = {this.deleteSalad}
    changeSalad = {this.changeSalad}
    />;

    const PageNotFound = () => <h1>Page not found</h1>

    return (
      <Router>
      <div>
        <div className="jumbotron text-center">
        <h1 className="display-4">The Nordic Salad Bar</h1>
          <hr className="my-4" />
          <p>Komponera din egen sallad!</p>
        </div>
        <div>
        <ul className="nav nav-pills">
<li className="nav-item">
<Link className="nav-link" to='compose-salad'>
Komponera din egen sallad</Link>
</li>
<li className="nav-item">
<Link className="nav-link" to='view-order'>
Se din order</Link>
</li>
</ul>
<Switch>
<Route path='/compose-salad' render={composeSaladElem}/>
<Route path='/view-order' render ={viewOrderElem}/>
<Route path='/resubmit-salad' render ={resubmitSaladElem}/>
<Route component={PageNotFound} />
</Switch>
</div>
    </div>
    </Router>
    );
  }
}

export default App;
