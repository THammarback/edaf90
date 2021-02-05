import React, { Component } from 'react';
import {Salad} from './salad';


class ComposeSalad extends Component {
  constructor(props){
    super(props)
    this.state = {error:false};
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.classList.add("was-validated");

    if(event.target.checkValidity()){
      this.props.history.push("/list-salad")
      this.props.returnSalad(this.props.salad)
    }
    this.setState({error:true});
  }

  handleChange = (event,name,add) =>{
    event.target.parentElement.classList.add("was-validated");
    if(add)
      this.props.salad.add(name)
    else
      this.props.salad.remove(name)
    this.props.setSalad(this.props.salad)
    
     if(this.state.error){
       this.setState({error:!(event.target.form.checkValidity())})
     }
  }

  render() {
    const inventory = this.props.inventory;
    let foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
    let proteins = Object.keys(inventory).filter(name => inventory[name].protein);
    let dressings = Object.keys(inventory).filter(name => inventory[name].dressing);
    let extras = Object.keys(inventory).filter(name => inventory[name].extra);

    return (
      <>
        <form onSubmit={this.handleSubmit} noValidate>
          <SelectSelector selected={this.props.salad.foundation} category="foundation" label={<Label text="Choose a foundation:" />} items={foundations} changeHandler={this.handleChange}/>
          <CheckboxSelector selected={this.props.salad.proteins} category="protein" label={<Label text="Choose as many proteins as you like:" />} items={proteins} changeHandler={this.handleChange}/>
          <CheckboxSelector selected={this.props.salad.extras} category="extra" label={<Label text="Mix and match your extras:" />} items={extras} changeHandler={this.handleChange}/>
          <SelectSelector selected={this.props.salad.dressing} category="dressing" label={<Label text="ONLY ONE DRESSING!" />} items={dressings} changeHandler={this.handleChange}/>
          <input type="submit" className="btn btn-primary" />
        </form>
        <span>{this.state.error?<div style={{fontSize:"80%",color:"#dc3545"}}>Saknas något i din beställning!</div>:""} Price: {this.props.salad.price()}</span>
      </>
    );
  }
}

const Label = (props) => <label>{props.text}</label>;

const SelectSelector = ({label, category, items, selected, changeHandler}) => {
  return (
    <div className="form-group">
      {label}<br />
      <select required name={category} value={selected} onChange={(event)=>changeHandler(event, event.target.value, selected!==event.target.value)}>
        <option key={"blank"} value=""> </option>
        {items.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
      <div className="invalid-feedback">Select one {category}!</div>
    </div>
  );
}

const CheckboxSelector = ({label, category, items, selected, changeHandler}) => {
  return (
    <div className="form-group">
      {label}<br />
      <ul className="selector_list">
        {items.map((item, i) =>
          <li key={item}>
            <input id={category+i} name={category} type="checkbox" checked={selected.includes(item)} onChange={(event)=>changeHandler(event,item,!selected.includes(item))}/>
            <label htmlFor={category+i} >{item}</label>
         </li>
        )}
      </ul>
    </div>
  )
}

const RadioSelector = ({label, category, items, selected, changeHandler}) => {
  return (
    <div className="form-group">
      {label}
      <ul className="selector_list">
        {items.map((item, i) =>
          <li key={item}>
            <input required id={category+i} name={category} type="radio" checked={selected === item} onChange={(event)=>changeHandler(event,item, selected !== item)}/>
            <label htmlFor={category+i} >{item}</label>
          </li>
        )}
      </ul>
      <div className="invalid-feedback">Select one dressing!</div>
    </div>
  )
}


export default ComposeSalad;
