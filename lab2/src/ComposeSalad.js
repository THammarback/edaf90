import React, { Component } from 'react';
import {Salad} from './salad';


class ComposeSalad extends Component {
  constructor(props){
    super(props)
  }

  handleSubmit = (event) => {
    document.getElementById("modalCloseButton").click()
    event.preventDefault();
    this.props.returnSalad(this.props.salad)
  }

  handleChange = (name,add) =>{
    if(add)
      this.props.salad.add(name)
    else
      this.props.salad.remove(name)
    this.props.setSalad(this.props.salad)
  }

  render() {
    const inventory = this.props.inventory;
    let foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
    let proteins = Object.keys(inventory).filter(name => inventory[name].protein);
    let dressings = Object.keys(inventory).filter(name => inventory[name].dressing);
    let extras = Object.keys(inventory).filter(name => inventory[name].extra);

    return (
      <form id="composeSaladForm" onSubmit={this.handleSubmit}>
        <SelectSelector selected={this.props.salad.foundation} category="foundation" label={<Label text="Choose a foundation:" />} items={foundations} changeHandler={this.handleChange}/>
        <CheckboxSelector selected={this.props.salad.proteins} category="protein" label={<Label text="Choose as many proteins as you like:" />} items={proteins} changeHandler={this.handleChange}/>
        <CheckboxSelector selected={this.props.salad.extras} category="extra" label={<Label text="Mix and match your extras:" />} items={extras} changeHandler={this.handleChange}/>
        <RadioSelector selected={this.props.salad.dressing} category="dressing" label={<Label text="ONLY ONE DRESSING!" />} items={dressings} changeHandler={this.handleChange}/>
      </form>
    );
  }
}

const Label = (props) => <label>{props.text}</label>;

const SelectSelector = ({label, category, items, selected, changeHandler}) => {
  return (
  <>
    {label}
    <select name={category} value={selected} onChange={(event)=>changeHandler(event.target.value, selected!==event.target.value)}>
      {items.map(item => <option key={item} value={item}>{item}</option>)}
    </select>
  </>
  );
}

const CheckboxSelector = ({label, category, items, selected, changeHandler}) => {
  return (
    <>
      {label}
      <ul>
        {items.map((item, i) =>
          <li key={item}>
            <input id={category+i} name={category} type="checkbox" checked={selected.includes(item)} onChange={()=>changeHandler(item,!selected.includes(item))}/>
            <label htmlFor={category+i} >{item}</label>
         </li>
        )}
      </ul>
    </>
  )
}

const RadioSelector = ({label, category, items, selected, changeHandler}) => {

  return (
    <>
      {label}
      <ul>
        {items.map((item, i) =>
          <li key={item}>
            <input id={category+i} name={category} type="radio" checked={selected === item} onChange={()=>changeHandler(item, selected !== item)}/>
            <label htmlFor={category+i} >{item}</label>
          </li>
        )}
      </ul>
    </>
  )
}


export default ComposeSalad;
