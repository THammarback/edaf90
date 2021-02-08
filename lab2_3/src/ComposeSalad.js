import React, { Component } from 'react';
import inventory from "./inventory.ES6";
import Salad from "./Salad"

class ComposeSalad extends Component {
constructor(props) {
super(props);
this.count = 1;
this.state = {foundation: '', proteins: [], extras: [], dressing:''};

this.handleSelectChange = this.selectionChange.bind(this);
this.handleCheckboxChange = this.checkboxChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}

selectionChange = e => {
  const name = e.target.getAttribute("name");
  if(name === 'foundation'){
    this.setState({foundation: e.target.value});
  }
  if(name === 'dressing'){
    this.setState({dressing: e.target.value});
  }
}

checkboxChange = e => {
  const name = e.target.getAttribute("name");
  const value = e.target.value;
  if (name === "protein") {
    if (e.target.checked) {
      this.setState({proteins: [...this.state.proteins, value]});
    }else{
      this.setState(this.state.proteins.splice(this.state.proteins.indexOf(value), 1));
  }
  }else if (name === "extra") {
    if (e.target.checked) {
      this.setState({extras: [...this.state.extras, value]});
    }else{
      this.setState(this.state.extras.splice(this.state.extras.indexOf(value), 1));
    }
  }
};


handleSubmit = e => {
  e.preventDefault();
  e.target.classList.add("was-validated");
  if(e.target.checkValidity() === true){
  let mySalad = new Salad();
  mySalad.add(this.state.foundation);
  mySalad.add(this.state.dressing);

  this.state.proteins.forEach(name => {
	mySalad.add(name)});
  
  this.state.extras.forEach(name => {
	mySalad.add(name)});
  mySalad.cost = mySalad.price();
  this.props.addSalad(mySalad);

  this.setState({foundation: '', proteins: [], extras: [], dressing:''});
  this.props.history.push('/view-order');
  }
}

render() {
const inventory = this.props.inventory;
let foundations = Object.keys(inventory).filter(
name => inventory[name].foundation
);
let proteins = Object.keys(inventory).filter(
  name => inventory[name].protein);
let extras = Object.keys(inventory).filter(
  name => inventory[name].extra);
let dressings = Object.keys(inventory).filter(
  name => inventory[name].dressing);

return (
  <form id = "composeSaladForm" onSubmit={this.handleSubmit} noValidate>
  <SaladSelection
    type="foundation"
    items={foundations}
    init={this.state.foundation}
    handleChange={this.selectionChange}
  />

  <SaladCheckbox 
  type="protein"
  items={proteins}
  handleChange={this.checkboxChange}
  itemList={this.state.proteins}
/>
  <SaladCheckbox 
  type ='extra' 
  items={extras}
  handleChange={this.checkboxChange}
  itemList={this.state.extras}
/>

  <SaladSelection
  type = 'dressing'
  items = {dressings}
  init = {this.state.dressing}
  handleChange = {this.selectionChange}
  />
  <button type = 'submit' className="btn btn-primary" value = 'Submit'>Lägg till sallad</button>
  </form>
  
);
}
}

class SaladSelection extends Component {
  render(){
  return(
    <>
  < div className="form-group">
  <label htmlFor="select">Välj en {this.props.type}</label>
  <select required 
    className="form-control" 
    id="select"
    value={this.props.init}
    name={this.props.type}
    onChange={this.props.handleChange}>
    <option value="">...</option>
    {this.props.items.map(name => (
      <option key={name} value={name}>
        {name} + {inventory[name].price} kr
      </option>))}
  </select>
  <div className="invalid-feedback">Du måste välja en {this.props.type}</div>
  </div>
  </>
  );
  }
}

class SaladCheckbox extends Component{
render() {
  return (
    <>
    < div className="form-group">
    <label htmlFor="checkbox">Välj en eller flera {this.props.type}</label>
    <ul>
      {this.props.items.map(name =>
        <li key={name}>
          <label htmlFor={name}>{name} + {inventory[name].price} kr</label>
          <input 
          type="checkbox"
          value={name}
          name={this.props.type}
          checked={this.props.itemList.includes(name) || false}
          onChange={this.props.handleChange}
          />
        </li>
      )}
    </ul>
    </div>
  </>
     );
    }
  }

export default ComposeSalad;

