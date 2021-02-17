import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Salad from "./Salad"
import "./styles.css";

const API = "http://localhost:8080"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order:JSON.parse(window.localStorage.getItem("order"))?.map(salad => new Salad(salad.foundation, ...salad.proteins, ...salad.extras, salad.dressing)) || [],
      inventory:{},
      selectedSalad:undefined
    }
  }

  componentDidMount(){
    let list = ["foundations","dressings","extras","proteins"];

    //Fetch all in list
    Promise.all(list.map(category=>fetch(API+'/'+category).then(res=>res.json()).then(name=>({name:category, items:name}))))
    //iterate every ingredient
    .then(data => Promise.all(data.map(category =>
      //fetch all properties
       Promise.all(category.items.map(name => fetch(API+'/'+category.name+'/'+name).then(res=>res.json()).then(properties=>({name:name, properties:properties}))))
        //Reformat
        .then(that=>{
          let outer = {}
          let inner = {}
          that.forEach(item=>outer[item.name] = item.properties);
          inner[category.name] = outer;
          return inner
        })
      ))
    ).then(a => {
      //set state
      this.setState({inventory:Object.assign(...a)})
    }).catch(err => {
      console.error("Error occured with fetching inventory from server")
    })
  }

  placeOrder = (success) =>{
    if(this.state.order.length)
      fetch(API+"/orders", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(this.state.order)
      }).then(res=>{
        success(res.ok)
      }).catch(res=>{
        success(false)
      });
    else success(false, "empty")
  }

  addSalad = (thatSalad) => {
    this.setState(state=>{
      let newOrderList = [...state.order.filter(salad=>salad !== thatSalad), thatSalad];
      window.localStorage.setItem("order", JSON.stringify(newOrderList))
      return {order:newOrderList}
    });
  }

  deleteSalad = (thatSalad) => {
    this.setState(state=>{
      let newOrderList = [...state.order.filter(salad=>salad !== thatSalad)];
      window.localStorage.setItem("order", JSON.stringify(newOrderList))
      return {order:newOrderList}
    });
  }

  editSalad = (thatSalad) => {
    this.setState(state => ({selectedSalad:thatSalad}));
  }

  deSelectSalad = () => {
    this.setState({selectedSalad:undefined})
  }

  render = () => {
    const ComposeSaladElem = (props) => <ComposeSalad {...props} inventory={this.state.inventory} addSalad={this.addSalad} selectedSalad={this.state.selectedSalad}/>;
    const ViewOrderElem = (props) => <ViewOrder {...props} order={this.state.order} remove={this.deleteSalad} change={this.editSalad} placeOrder={this.placeOrder}/>;
    const PageNotFound = (props) => <h1>Page not found</h1>

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
            <li className="nav-item" onClick={this.deSelectSalad}>
              <Link className="nav-link" to="compose-salad">
                Komponera din egen sallad!
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="view-order">
                Visa beställning
              </Link>
            </li>
          </ul>
          <section className="mainContent">
            <Switch>
              <Route path='/compose-salad' render={ComposeSaladElem}/>
              <Route path='/view-order' render={ViewOrderElem}/>
              <Route component={PageNotFound}/>
            </Switch>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
