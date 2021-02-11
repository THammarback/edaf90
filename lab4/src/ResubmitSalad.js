import React, { Component } from 'react';
import inventory from "./inventory.ES6";
import Salad from "./Salad"

class ResubmitSalad extends Component {
constructor(props) {
super(props);
this.state = {foundation: '', proteins: [], extras: [], dressing:''};

this.handleSelectChange = this.selectionChange.bind(this);
this.handleCheckboxChange = this.checkboxChange.bind(this);
this.handleReSubmit = this.handleReSubmit.bind(this);
this.changeValues();

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

handleReSubmit = e => {
  e.preventDefault();
  e.target.classList.add("was-validated");
  if(e.target.checkValidity() === true){
    
    let newSalad = new Salad();
    newSalad.id = this.props.mySalad.id;
    newSalad.add(this.state.foundation);
    newSalad.add(this.state.dressing);
  
    this.state.proteins.forEach(name => {
    newSalad.add(name)});
    
    this.state.extras.forEach(name => {
    newSalad.add(name)});
    newSalad.cost = newSalad.price();
  this.props.addOrder(newSalad);
  this.setState({foundation: '', proteins: [], extras: [], dressing:''});
  this.props.history.push('/view-order');
  }
}

changeValues (){
  console.log(this.props.mySalad);
  this.state.foundation = this.props.mySalad.foundation;
  this.state.dressing = this.props.mySalad.dressing;
  this.state.proteins = this.props.mySalad.protein;
  this.state.extras = this.props.mySalad.extras;
  console.log(this.state);

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
  <form id = "composeSaladForm" onSubmit={this.handleReSubmit} noValidate>
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
  <button type = 'submit' className="btn btn-primary" value = 'submit'>Spara sallad</button>
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
    id="selec"
    value={this.props.init}
    name={this.props.type}
    onChange={this.props.handleChange}>
    <option value="">...</option>
    {this.props.items.map(name => (
      <option key={name} value={name} id = {name}>
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
          id = {name}
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

export default ResubmitSalad;

